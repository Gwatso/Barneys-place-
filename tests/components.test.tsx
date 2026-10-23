import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DEMO_NOTICE, EnquiryForm } from "@/components/admissions/EnquiryForm";
import { QuestionAccordion } from "@/components/admissions/QuestionAccordion";
import { Gallery } from "@/components/gallery/Gallery";
import { admissions, gallery, galleryCategories, school } from "@/content/school";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("EnquiryForm", () => {
  it("shows accessible errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<EnquiryForm delivery={{ kind: "demo" }} phones={school.phones} />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    const name = screen.getByLabelText(/parent or guardian name/i);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveFocus();
    expect(name).toHaveAccessibleDescription(/tell us your name/i);
    expect(screen.getByText(/check the 3 highlighted fields/i)).toBeInTheDocument();
  });

  it("demo submission shows the demonstration notice and sends nothing", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<EnquiryForm delivery={{ kind: "demo" }} phones={school.phones} />);
    await user.type(screen.getByLabelText(/parent or guardian name/i), "Tendai Moyo");
    await user.type(screen.getByLabelText(/preferred contact number/i), "077 123 4567");
    await user.selectOptions(screen.getByLabelText(/enquiry topic/i), "Fees");
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    expect(await screen.findByText(DEMO_NOTICE, {}, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.getByText(/thank you, tendai/i)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("shows an error state when an endpoint rejects the enquiry", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("nope", { status: 500 }));
    const user = userEvent.setup();
    render(<EnquiryForm delivery={{ kind: "endpoint", url: "https://forms.example.test/x" }} phones={school.phones} />);
    await user.type(screen.getByLabelText(/parent or guardian name/i), "Tendai Moyo");
    await user.type(screen.getByLabelText(/preferred contact number/i), "0771234567");
    await user.selectOptions(screen.getByLabelText(/enquiry topic/i), "Fees");
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(await screen.findByText(/could not be sent just now/i)).toBeInTheDocument();
    expect(screen.queryByText(/your enquiry was sent/i)).not.toBeInTheDocument();
    fetchSpy.mockRestore();
  });
});

describe("QuestionAccordion", () => {
  it("toggles one panel at a time and never invents answers", async () => {
    const user = userEvent.setup();
    render(<QuestionAccordion questions={admissions.questions} />);
    const first = screen.getByRole("button", { name: /which ages do you welcome/i });
    const fees = screen.getByRole("button", { name: /what are the fees/i });
    expect(first).toHaveAttribute("aria-expanded", "true");
    await user.click(fees);
    expect(fees).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("region", { name: /what are the fees/i })).toHaveTextContent(/has not been published yet/i);
  });
});

describe("Gallery lightbox", () => {
  it("filters, opens, browses with keys and returns focus on close", async () => {
    const user = userEvent.setup();
    render(<Gallery items={gallery} categories={galleryCategories} />);
    await user.click(screen.getByRole("button", { name: /creative moments/i }));
    expect(screen.getByText(/showing 3 of 12/i)).toBeInTheDocument();

    const tile = screen.getByRole("button", { name: /view full-screen: painting time/i });
    await user.click(tile);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("button", { name: /close viewer/i })).toHaveFocus();
    expect(dialog).toHaveAccessibleName("Painting time");

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(screen.getByRole("dialog")).toHaveAccessibleName(/meet pip/i);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowLeft" });
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "ArrowLeft" });
    expect(screen.getByRole("dialog")).toHaveAccessibleName(/children’s artwork/i);

    await act(async () => {
      fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(tile).toHaveFocus();
  });
});
