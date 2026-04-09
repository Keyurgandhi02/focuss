import { Button } from "@/components/ui/Button";

export function SettingsActions({ isSaved, onSave, onCancel }) {
  return (
    <div className="flex gap-4 pt-4">
      <Button variant="primary" size="md" onClick={onSave}>
        {isSaved ? "Saved! ✓" : "Save Settings"}
      </Button>
      <Button variant="outline" size="md" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}
