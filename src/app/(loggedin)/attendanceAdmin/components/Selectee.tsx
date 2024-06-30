import { Button } from "@/components/ui/button";
import { useCourses } from "../../courses/hooks/useCourses";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

export default function Select({}: Props) {
  const { courses } = useCourses();

  return (
    <div>
      <Button>
        <Select></Select>
      </Button>
    </div>
  );
}
