"use client";

import React, { useState } from "react";

interface BcfBoard {
  id: number;
  name: string;
  createdAt: string;
}

interface Bcf {
  id: number;
  name: string;
  createdAt: string;
  bcfBoards: BcfBoard[];
}

interface UseCase {
  id: number;
  name: string;
  createdAt: string;
  bcfs: Bcf[];
}

interface SidebarProps {
  useCases: UseCase[];
}

const Sidebar: React.FC<SidebarProps> = ({ useCases }) => {
  const [expandedUseCase, setExpandedUseCase] = useState<number | null>(null);
  const [expandedBcf, setExpandedBcf] = useState<number | null>(null);

  const toggleUseCase = (useCaseId: number) => {
    setExpandedUseCase(expandedUseCase === useCaseId ? null : useCaseId);
    setExpandedBcf(null);
  };

  const toggleBcf = (bcfId: number) => {
    setExpandedBcf(expandedBcf === bcfId ? null : bcfId);
  };

  return (
    <div className="w-64 bg-purple-900 text-white h-screen p-4">
      <div className="text-xl font-bold mb-4">Industry</div>
      {useCases.map((useCase) => (
        <div key={useCase.id} className="mb-2">
          <div
            onClick={() => toggleUseCase(useCase.id)}
            className="cursor-pointer flex justify-between items-center"
          >
            <span>{useCase.name}</span>
            <span>{expandedUseCase === useCase.id ? "-" : "+"}</span>
          </div>
          <hr />
          {expandedUseCase === useCase.id &&
            useCase.bcfs.map((bcf) => (
              <div key={bcf.id} className="ml-4 mt-2">
                <div
                  onClick={() => toggleBcf(bcf.id)}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <span>{bcf.name}</span>
                  <span>{expandedBcf === bcf.id ? "-" : "+"}</span>
                </div>
                {expandedBcf === bcf.id &&
                  bcf.bcfBoards.map((board) => (
                    <div key={board.id} className="ml-4 mt-1">
                      {board.name}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
