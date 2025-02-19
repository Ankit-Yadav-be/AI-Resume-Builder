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
import { AIchatSession } from "./../../../../../../../backend/service/geminiService";

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

        setLoading(true); // Start loading
        try {
            const prompt = PROMPT.replace(
                "{positionTitle}",
                resumeData.experience[index].title
            );
            const result = await AIchatSession.sendMessage(prompt);

            // Parse the response text properly
            const responseText = result.response.text();
            setValue(responseText.replace('[', '').replace(']', '')); // Set formatted HTML content
        } catch (error) {
            console.error("Error generating summary from AI:", error);
            alert("Failed to generate summary. Please try again.");
        } finally {
            setLoading(false); // Stop loading
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
