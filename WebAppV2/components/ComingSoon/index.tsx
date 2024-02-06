"use client";
import Card from "../Card";
import Stack from "../Stack";
import Surface from "../Surface";
import Typography from "../Typography";

interface ComingSoonHashtagPropsType {
  text: string;
}
const ComingSoonHashtag = ({ text }: ComingSoonHashtagPropsType) => {
  return (
    <span className="inline-block bg-gray-200 dark:bg-black rounded-xl rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
      <Typography weight="bold" variant="body2" text="#comingsoon" />
    </span>
  )
};

export const ComingSoon = () => {
  return (
    <Surface className="flex items-center justify-center text-center">
      <Card elevation={2}>
        <Stack spacing={6}>
          <Typography variant="header2" text="Coming Soon!" />
          <Typography variant="body1" text="We're working hard to bring you something amazing. Stay tuned!" />
          <Stack spacing={2} isRow={true}>
            <ComingSoonHashtag text="#exciting" />
            <ComingSoonHashtag text="#newfeatures" />
            <ComingSoonHashtag text="#comingsoon" />
          </Stack>
        </Stack>
      </Card>
    </Surface>
  );
};
