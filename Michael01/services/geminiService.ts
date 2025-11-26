import { GoogleGenAI } from "@google/genai";
import { CalculationResult } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getPackingAdvice = async (result: CalculationResult): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "AI服务不可用：缺少API密钥。";
  }

  const { containerSpec, totalCount, totalWeight, totalVolume, weightUtilizationPercent, volumeUtilizationPercent } = result;

  const prompt = `
    我正在使用 ${containerSpec.name} 运输货物。
    计算结果如下：
    - 总装载件数: ${totalCount} 件
    - 货物总重: ${totalWeight.toFixed(2)} kg (限重: ${containerSpec.maxWeight} kg)
    - 总体积: ${totalVolume.toFixed(2)} m3 (限积: ${containerSpec.volume} m3)
    - 重量利用率: ${weightUtilizationPercent.toFixed(1)}%
    - 空间利用率: ${volumeUtilizationPercent.toFixed(1)}%

    请为物流经理提供简明扼要的专业分析（中文）：
    1. 当前装载方案是否高效？
    2. 是否存在安全隐患（例如重量接近100%）？
    3. 针对剩余空间，有什么具体的加固建议（如垫料、绑扎带）？
    
    请保持在150字以内，使用要点格式回答。
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "未生成建议。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "暂时无法获取AI建议。";
  }
};