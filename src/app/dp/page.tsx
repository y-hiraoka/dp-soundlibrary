import { FC } from "react";
import { FilteredSoundList } from "../../components/SoundList";

const Page: FC = () => {
  return (
    <div className="space-y-4">
      <FilteredSoundList />
    </div>
  );
};

export default Page;
