import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    intitialValues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
     open, 
     onOpenChange,
     intitialValues
    }: UpdateMeetingDialogProps) => {
    
    return (
        <ResponsiveDialog title="Update Meeting" 
        description="Update the Meeting" 
        open={open} 
        onOpenChange={onOpenChange}>
            <MeetingForm 
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
            initialValues={intitialValues}
            />
        </ResponsiveDialog>
    )
}