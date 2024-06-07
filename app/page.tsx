
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import PromptList from "../components/PromptList";

type BcfBoard = {
  id: number;
  name: string;
  createdAt: string;
};

type Bcf = {
  id: number;
  name: string;
  createdAt: string;
  bcfBoards: BcfBoard[];
};

type Board = {
  id: number;
  name: string;
  createdAt: string;
  bcfs: Bcf[];
};

type Prompt = {
  id: number;
  name: string;
  createdAt: string;
};

const HomePage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("week");

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await axios.get(
        "https://demo6396395.mockable.io/bcf-boards"
      );
      setBoards(response.data.boards);
    };

    const fetchPrompts = async () => {
      const response = await axios.get(
        "https://demo6396395.mockable.io/prompts"
      );
      setPrompts(response.data);
      console.log(response.data);
    };

    fetchBoards();
    fetchPrompts();
  }, []);

  const filterPrompts = (prompts: Prompt[]) => {
    return prompts.filter((prompt) => {

      if (
        searchQuery &&
        !prompt.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredPrompts = filterPrompts(prompts);

  return (
    <div className="flex bg-purple-500">
      <Sidebar useCases={boards} />
      
      <div className="flex-grow p-6">
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search prompts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-2">BCF Board 1</h2>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${
                  filter === "today" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("today")}
              >
                Today
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filter === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("week")}
              >
                Week
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filter === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setFilter("month")}
              >
                Month
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <PromptList prompts={filteredPrompts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
