import { CircleXIcon, CircleCheckIcon, ClockArrowUpIcon, VideoIcon, LoaderIcon } from "lucide-react";

import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

const options = [
    {
        id: MeetingStatus.UPCOMING,
        value: MeetingStatus.UPCOMING,
        children: <div className="flex items-center gap-x-2 capitalize">
            <CircleXIcon className="size-4" />
                {MeetingStatus.UPCOMING}
        </div>
    },
    {
        id: MeetingStatus.COMPLETED,
        value: MeetingStatus.COMPLETED,
        children: <div className="flex items-center gap-x-2 capitalize">
            <CircleCheckIcon className="size-4" />
            {MeetingStatus.COMPLETED}
        </div>
    },
    {
        id: MeetingStatus.ACTIVE,
        value: MeetingStatus.ACTIVE,
        children: <div className="flex items-center gap-x-2 capitalize">
            <VideoIcon className="size-4" />
            {MeetingStatus.ACTIVE}
        </div>
    },
    {
        id: MeetingStatus.PROCESSING,
        value: MeetingStatus.PROCESSING,
        children: <div className="flex items-center gap-x-2 capitalize">
            <LoaderIcon className="size-4" />
            {MeetingStatus.PROCESSING}
        </div>
    },
    {
        id: MeetingStatus.CANCELLED,
        value: MeetingStatus.CANCELLED,
        children: <div className="flex items-center gap-x-2 capitalize">
            <CircleXIcon className="size-4" />
            {MeetingStatus.CANCELLED}
        </div>
    },
]

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    return (
        <CommandSelect placeholder="Status" className="h-9" options={options}
        onSelect={(value) => setFilters({ status: value as MeetingStatus })}
        value={filters.status ?? ""} />
    )
}