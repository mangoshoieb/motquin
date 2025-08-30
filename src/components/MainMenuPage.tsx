import React, { useState } from "react";
import {
  Trophy,
  BookOpen,
  MessageCircle,
  Shield,
  ArrowLeft,
  UserCircle,
} from "lucide-react";
import type { Page } from "../App";

interface MainMenuPageProps {
  onMenuSelect: (page: Page) => void;
}

const menuItems = [
  {
    id: "leaderboard" as Page,
    title: "قوائم الصداره والمسابقات",
    description: "تنافس مع زملائك واحصل على النقاط",
    icon: "/truphy-Photoroom.png", // use image instead of Trophy
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    hoverColor: "hover:from-yellow-200 hover:to-yellow-300",
  },
  {
    id: "subjects" as Page,
    title: "أتقن دروسك",
    description: "ابدأ رحلة التعلم مع المواد الدراسية",
    icon: "/master_imoje.png", // use image instead of BookOpen
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    hoverColor: "hover:from-blue-200 hover:to-blue-300",
  },
  {
    id: "chatbot" as Page,
    title: "افهم دروسك",
    description: "مساعد ذكي لمراجعة وفهم المواد",
    icon: "/understand_imoje.png", // (you can upload a custom chatbot icon here)
    color: "text-green-600",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    hoverColor: "hover:from-green-200 hover:to-green-300",
  },
  {
    id: "distractions" as Page,
    title: "منع المشتتات",
    description: "تحكم في التطبيقات أثناء الدراسة",
    icon: "/avoide_dis.png", // (you can upload a custom shield icon here)
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
    hoverColor: "hover:from-purple-200 hover:to-purple-300",
  },
];

export default function MainMenuPage({ onMenuSelect }: MainMenuPageProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen p-6 relative">
      <div className="absolute top-6 right-6">
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          <UserCircle
            size={40}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden z-50">
            <ul className="divide-y divide-blue-100">
              <li>
                <button className="w-full text-right px-4 py-2 hover:bg-blue-50 text-blue-700 font-medium">
                  خططي الدراسية
                </button>
              </li>
              <li>
                <button className="w-full text-right px-4 py-2 hover:bg-blue-50 text-blue-700 font-medium">
                  العروض و الدفع
                </button>
              </li>
              <li>
                <button className="w-full text-right px-4 py-2 hover:bg-blue-50 text-blue-700 font-medium">
                  الإعدادات
                </button>
              </li>
              <li>
                <button className="w-full text-right px-4 py-2 hover:bg-blue-50 text-blue-700 font-medium">
                  تواصل معنا
                </button>
              </li>
              <li>
                <button className="w-full text-right px-4 py-2 hover:bg-blue-50 text-blue-700 font-medium">
                  عن الفريق
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Header */}
      <div className="text-center mb-12">
        <img
          src="dist/motqen.png"
          alt="logo"
          className="mx-auto w-[35rem] h-[13rem]"
        />
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map((item) => {
            // const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => onMenuSelect(item.id)}
                className={`${item.bgColor} ${item.hoverColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 cursor-pointer group`}
              >
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Texts */}
                  <div>
                    <h3 className={`${item.color} text-2xl font-bold mb-2`}>
                      {item.title}
                    </h3>
                    {/* <p className="text-gray-600 text-lg leading-relaxed">
                      {item.description}
                    </p> */}
                  </div>

                  {/* Arrow (on hover) */}
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowLeft size={24} className={`${item.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="mt-16 flex justify-center">
        <div className="flex space-x-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i === 0
                  ? "bg-yellow-400"
                  : i === 1
                  ? "bg-blue-400"
                  : i === 2
                  ? "bg-green-400"
                  : "bg-purple-400"
              } animate-pulse`}
              style={{ animationDelay: `${i * 300}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
