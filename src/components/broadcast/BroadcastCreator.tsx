import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Users, Clock } from "lucide-react";

interface BroadcastCreatorProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: BroadcastData) => void;
}

interface BroadcastData {
  title: string;
  message: string;
  audience: string;
  scheduledDate?: Date;
}

const BroadcastCreator = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {},
}: BroadcastCreatorProps) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[720px] bg-white">
        <DialogHeader>
          <DialogTitle>Create Broadcast Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Broadcast Title</label>
            <Input placeholder="Enter broadcast title" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              placeholder="Type your broadcast message"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Audience</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select audience segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contacts</SelectItem>
                <SelectItem value="active">Active Customers</SelectItem>
                <SelectItem value="inactive">Inactive Customers</SelectItem>
                <SelectItem value="new">New Customers</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              <span>Estimated reach: 1,234 contacts</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Schedule</label>
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select defaultValue="now">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Send Now</SelectItem>
                  <SelectItem value="morning">Morning (9 AM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (2 PM)</SelectItem>
                  <SelectItem value="evening">Evening (6 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>Estimated sending time: 5-10 minutes</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                onSubmit({ title: "", message: "", audience: "all" })
              }
            >
              Create Broadcast
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastCreator;
