import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";
import { Brain } from "lucide-react";
import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [value, setValue] = useState(""); // Initialize value as empty string
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);

  const PROMPT =
    "positionTitle:{positionTitle}, based on this position title, give me 5-6 bullet points for my resume in HTML format.";

  const generateSummeryFromAI = async () => {
    if (!resumeData.experience[index]?.title) {
      alert("Please add a position title.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-resume-builder-7yb4.onrender.com/api/ai/generate-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            positionTitle: resumeData.experience[index].title,
          }),
        }
      );

      const data = await response.json();
      setValue(data.summary); // Set the AI-generated summary
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          onClick={generateSummeryFromAI}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <>
              <Brain className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value); // Update editor value
            onRichTextEditorChange(e); // Trigger change handler for parent
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
