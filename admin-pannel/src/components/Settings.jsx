"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ClassSettings from "./classsettings"; // Adjust file path if necessary
import SubjectSettings from "./subjectsettings"; // Adjust file path if necessary
import ExamCategorySettings from "./examcategorysettings"; // Adjust file path if necessary
import ExamSettings from "./examsettings";
import ChapterSettings from "./chaptersettings";
import QuestionTypeSettings from "./questiontypesettings";

const Settings = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Settings</h1>

      {/* Class Settings Section */}
      <div className="mb-5">
        <ClassSettings />
      </div>

      {/* Subject Settings Section */}
      <div className="mb-5">
        <SubjectSettings />
      </div>
      {/* Chapter Settings Section */}
      <div className="mb-5">
        <ChapterSettings/>
      </div>

      {/* Question Type Settings Section */}
      <div className="mb-5">
        <QuestionTypeSettings/>
      </div>

      {/* Exam Category Settings Section */}
      <div className="mb-5">
        <ExamCategorySettings />
      </div>
        {/* Exam  Settings Section */}
        <div className="mb-5">
        <ExamSettings/>
      </div>
    </div>
  );
};

export default Settings;
