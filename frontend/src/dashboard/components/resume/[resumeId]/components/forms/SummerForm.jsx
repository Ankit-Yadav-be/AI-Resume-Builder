import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/ResumeContext";
import axios from "axios";
import { Brain, LoaderCircle, Terminal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SummerForm = ({ enableNext }) => {
  const { resumeData, setResumeData } = useResume();
  const [summery, setSummery] = useState(resumeData.summery);
  const param = useParams();
  const userResumeId = param.resumeId;
  const [loading, setLoading] = useState(false);
  const [aiGenerativeSummeryList, setAiGenerativeSummeryList] = useState([]);
  const [alert, setAlert] = useState(null); // Alert state for AI and save

  const promptTemplate = `jobTitle :{jobTitle}, depends on job title give the summary for my resume within 3-4 lines in JSON format with field experience level and summary with experience level for freshers, mid-level, experienced`;

  useEffect(() => {
    if (summery) {
      setResumeData({
        ...resumeData,
        summery: summery,
      });
    }
  }, [summery]);

  // ✅ AI GENERATION via API
  const generateSummeryFromAI = async () => {
    setLoading(true);
    const prompt = promptTemplate.replace("{jobTitle}", resumeData?.jobTitle || "Software Engineer");

    try {
      const result = await axios.post(
        `https://ai-resume-builder-7yb4.onrender.com/api/ai/generate-summary`,
        { prompt }
      );

      const parsedResult = JSON.parse(result.data.summary);
      setAiGenerativeSummeryList(parsedResult);
      setAlert({ type: "success", message: "AI generated summary successfully!" });
    } catch (error) {
      console.error("Error generating summary from AI:", error);
      setAlert({ type: "error", message: "Failed to generate summary from AI." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ SAVE FUNCTIONALITY
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    enableNext(false);

    const updatedData = { ...resumeData, summery };

    try {
      const response = await axios.put(
        `https://ai-resume-builder-7yb4.onrender.com/api/v1/resume-update/${userResumeId}`,
        updatedData
      );

      setResumeData(updatedData);
      enableNext(true);
      setAlert({ type: "success", message: "Your resume summary has been successfully updated." });
    } catch (error) {
      console.error("Error updating resume:", error.response?.data || error.message);
      setAlert({ type: "error", message: "Failed to update your resume summary." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary Details</h2>
        <p>Add a summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary flex gap-2"
              type="button"
              onClick={generateSummeryFromAI}
              disabled={loading}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>

          <Textarea
            required
            className="mt-5"
            value={summery}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className="flex mt-3 justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  Saving...
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>

        {alert && (
          <Alert className={`mt-5 ${alert.type === "success" ? "bg-green-300" : "bg-red-300"}`}>
            <Terminal className="h-4 w-4" />
            <AlertTitle>{alert.type === "success" ? "Success!" : "Error!"}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        {aiGenerativeSummeryList.length > 0 && (
          <div className="mt-2">
            <h2 className="font-bold text-lg">Suggestions</h2>
            {aiGenerativeSummeryList.map((item, index) => (
              <div key={index}>
                <h2 className="font-bold my-1">Level: {item?.experienceLevel}</h2>
                <p>{item?.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummerForm;
