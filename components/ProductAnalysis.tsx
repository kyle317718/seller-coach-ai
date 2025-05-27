"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface AnalysisResult {
  category: string;
  title: string;
  description: string;
  details: string[];
}

interface ProductAnalysisProps {
  analysisResults: AnalysisResult[];
}

export function ProductAnalysis({ analysisResults }: ProductAnalysisProps) {
  const [activeTab, setActiveTab] = useState(analysisResults[0]?.category ?? "");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue={activeTab} className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`grid w-full grid-cols-${analysisResults.length}`}> {/* 동적 컬럼 */}
          {analysisResults.map((result) => (
            <TabsTrigger
              key={result.category}
              value={result.category}
            >
              {result.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {analysisResults.map((result) => (
          <TabsContent key={result.category} value={result.category}>
            <Card>
              <CardHeader>
                <CardTitle>{result.title}</CardTitle>
                <CardDescription>{result.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2"
                    >
                      <span className="text-blue-500">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
