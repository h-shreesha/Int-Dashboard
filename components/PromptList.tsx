import React from "react";
import { format, parseISO } from "date-fns";

type Prompt = {
  id: number;
  name: string;
  createdAt: string;
};

type Props = {
  prompts: Prompt[];
};

const PromptList: React.FC<Props> = ({ prompts }) => {
  return (
    <>
      {prompts.map((prompt) => (
        <div key={prompt.id} className="p-4 bg-white rounded shadow">
          <div className="text-gray-600 text-sm">
            {format(parseISO(prompt.createdAt), "MMM dd, yyyy")}
          </div>
          <div className="text-lg font-semibold">{prompt.name}</div>
          <div className="mt-2">
            <img src="/chart.png" alt="Chart" className="w-full h-24" />
          </div>
        </div>
      ))}
    </>
  );
};

export default PromptList;
