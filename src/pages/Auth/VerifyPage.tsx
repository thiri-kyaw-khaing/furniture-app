import { VerifyOTPForm } from "@/components/auth/VerifyOtpForm";
export default function InputPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyOTPForm />
      </div>
    </div>
  );
}
