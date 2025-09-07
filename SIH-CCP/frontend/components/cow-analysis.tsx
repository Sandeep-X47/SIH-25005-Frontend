import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Upload, Camera, FileImage } from 'lucide-react';
import { useLanguage } from './language-context';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface CowAnalysisData {
  height: number;
  width: number;
  length: number;
  angle: number;
  bodyCondition: number;
  overallScore: number;
  recommendations: string[];
}

const CowAnalysis: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<CowAnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setError(null);
        setAnalysisData(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // Simulate AI analysis with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock analysis results
      const mockData: CowAnalysisData = {
        height: Math.floor(Math.random() * 50) + 120, // 120-170 cm
        width: Math.floor(Math.random() * 30) + 45,   // 45-75 cm
        length: Math.floor(Math.random() * 60) + 140, // 140-200 cm
        angle: Math.floor(Math.random() * 20) + 85,   // 85-105 degrees
        bodyCondition: Math.floor(Math.random() * 2) + 3, // 3-5 score
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100 score
        recommendations: [
          "Maintain current feeding schedule",
          "Monitor weight gain weekly",
          "Ensure adequate water supply",
          "Regular veterinary checkups recommended"
        ]
      };

      setAnalysisData(mockData);

      // Store in localStorage as mock "database"
      const storedAnalyses = JSON.parse(localStorage.getItem('cowAnalyses') || '[]');
      const newAnalysis = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        data: mockData,
        imageUrl: selectedImage
      };
      storedAnalyses.push(newAnalysis);
      localStorage.setItem('cowAnalyses', JSON.stringify(storedAnalyses));

    } catch (err) {
      setError(t('analysisError') || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur"></div>
        <Card className="relative bg-card/80 backdrop-blur-lg border border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('uploadImage')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 space-y-4">
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected cow"
                      className="max-w-full max-h-64 rounded-lg shadow-lg"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysisData(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload cow image for analysis
                    </p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {selectedImage ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>

              {/* Analyze Button */}
              {selectedImage && !analysisData && (
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('analyzing')}
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      {t('startAnalysis')}
                    </>
                  )}
                </Button>
              )}

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {analysisData && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur"></div>
          <Card className="relative bg-card/80 backdrop-blur-lg border border-green-500/20 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {t('analysisComplete')}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">{t('overallScore')}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`${getScoreColor(analysisData.overallScore)} text-white px-4 py-2 rounded-full`}>
                      {analysisData.overallScore}/100
                    </div>
                    <Badge variant="secondary">
                      {getScoreLabel(analysisData.overallScore)}
                    </Badge>
                  </div>
                </div>

                {/* Measurements */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="text-xl font-semibold text-blue-400">{analysisData.height} cm</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Width</p>
                      <p className="text-xl font-semibold text-green-400">{analysisData.width} cm</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Length</p>
                      <p className="text-xl font-semibold text-purple-400">{analysisData.length} cm</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground">Angle</p>
                      <p className="text-xl font-semibold text-yellow-400">{analysisData.angle}°</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Body Condition */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Body Condition Score</span>
                      <span className="font-semibold">{analysisData.bodyCondition}/5</span>
                    </div>
                    <Progress value={analysisData.bodyCondition * 20} className="mt-2" />
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <div className="space-y-2">
                  <h4 className="font-medium">Recommendations:</h4>
                  <ul className="space-y-1">
                    {analysisData.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CowAnalysis;