import NewPassword from "@/components/auth/newPasswordForm";
export default function NewPasswordPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <NewPassword />
      </div>
    </div>
  );
}
