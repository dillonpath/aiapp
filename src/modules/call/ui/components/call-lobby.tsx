import { LogInIcon } from "lucide-react";
import { DefaultVideoPlaceholder, StreamVideoParticipant,
    ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview
 } from "@stream-io/video-react-sdk";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";

import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
    onJoin: () => void;
}

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder
        participant={
            {
                name: data?.user.name ?? "",
                image: data?.user.image ?? generateAvatarUri({
                    seed: data?.user.name ?? "",
                    variant: "initials",
                }),
            } as StreamVideoParticipant
        } />
    )
}

const AllowBrowserPermissions = () => {
    return (
        <p className="text-sm">
            Please allow browser permissions to access your camera and microphone to join the call
        </p>
    )
}

export const CallLobby = ({ onJoin }: Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();
    const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();

    const hasBrowserMediaPermissions = hasMicPermission && hasCameraPermission;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium">Ready to join?</h6>
                        <p className="text-sm text-muted-foreground">Set up call before joining</p>
                    </div>
                    <VideoPreview DisabledVideoPreview={
                        hasBrowserMediaPermissions ? DisabledVideoPreview : AllowBrowserPermissions
                    } />
                    <div className="flex gap-x-2">
                        <ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />
                    </div>
                    <div className="flex gap-x-2 justify-between w-full">
                        <Button asChild variant="ghost">
                            <Link href="/meetings">
                                Cancel
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={onJoin}>
                            <LogInIcon className="size-4" />
                            Join Call
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
