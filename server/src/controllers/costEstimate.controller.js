const basePrices = {
  "Business Website": { min: 15000, max: 25000, time: 12, complexity: "Low" },
  "Portfolio Website": { min: 10000, max: 18000, time: 10, complexity: "Low" },
  "E-Commerce": { min: 35000, max: 55000, time: 30, complexity: "High" },
  School: { min: 25000, max: 40000, time: 22, complexity: "Medium" },
  Hospital: { min: 30000, max: 50000, time: 28, complexity: "High" },
  Restaurant: { min: 20000, max: 35000, time: 18, complexity: "Medium" },
  "Real Estate": { min: 28000, max: 45000, time: 24, complexity: "Medium" },
  "Landing Page": { min: 8000, max: 15000, time: 7, complexity: "Low" },
  Blog: { min: 12000, max: 20000, time: 10, complexity: "Low" },
  "Custom Web Application": { min: 50000, max: 90000, time: 40, complexity: "High" },
};

const pageMultipliers = {
  "1-5": { min: 1, max: 1, time: 1 },
  "5-10": { min: 1.3, max: 1.25, time: 1.4 },
  "10-20": { min: 1.6, max: 1.5, time: 1.8 },
  "20+": { min: 2.0, max: 1.8, time: 2.2 },
};

const featureCosts = {
  "Admin Dashboard": { min: 5000, max: 8000, time: 4 },
  Authentication: { min: 3000, max: 5000, time: 3 },
  "Payment Gateway": { min: 5000, max: 8000, time: 5 },
  "Booking System": { min: 6000, max: 10000, time: 5 },
  Blog: { min: 3000, max: 5000, time: 3 },
  SEO: { min: 2000, max: 4000, time: 2 },
  "WhatsApp Integration": { min: 2000, max: 3000, time: 2 },
  "Contact Form": { min: 1000, max: 2000, time: 1 },
  "AI Chatbot": { min: 8000, max: 15000, time: 7 },
  "Email Integration": { min: 2000, max: 4000, time: 2 },
};

const designMultipliers = {
  Basic: { min: 1, max: 1, time: 1 },
  Standard: { min: 1.3, max: 1.25, time: 1.3 },
  Premium: { min: 1.7, max: 1.6, time: 1.7 },
};

const complexityThresholds = {
  High: 2,
  Medium: 1,
  Low: 0,
};

export const calculateEstimate = async (req, res) => {
  try {
    const { websiteType, pages, features, designQuality, description } = req.body;

    if (!websiteType || !pages || !designQuality) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const base = basePrices[websiteType];
    if (!base) {
      return res.status(400).json({ success: false, message: "Invalid website type" });
    }

    const pageMul = pageMultipliers[pages] || pageMultipliers["1-5"];
    const designMul = designMultipliers[designQuality] || designMultipliers.Standard;

    let minCost = base.min;
    let maxCost = base.max;
    let time = base.time;

    // Apply page multiplier
    minCost *= pageMul.min;
    maxCost *= pageMul.max;
    time *= pageMul.time;

    // Apply design multiplier
    minCost *= designMul.min;
    maxCost *= designMul.max;
    time *= designMul.time;

    // Add feature costs
    const selectedFeatures = Array.isArray(features) ? features : [];
    selectedFeatures.forEach((f) => {
      const fc = featureCosts[f];
      if (fc) {
        minCost += fc.min;
        maxCost += fc.max;
        time += fc.time;
      }
    });

    // Round to nearest 500
    minCost = Math.round(minCost / 500) * 500;
    maxCost = Math.round(maxCost / 500) * 500;

    // Determine complexity
    let complexityLevel = complexityThresholds[base.complexity] || 0;
    if (selectedFeatures.length > 3) complexityLevel++;
    if (selectedFeatures.length > 6) complexityLevel++;
    if (description && description.length > 100) complexityLevel++;

    const complexityMap = ["Low", "Medium", "High"];
    const complexity = complexityMap[Math.min(complexityLevel, 2)];

    // Recommended tech stack
    const techStack = ["React", "Node.js", "MongoDB", "Tailwind CSS"];
    if (selectedFeatures.includes("Payment Gateway")) techStack.push("Stripe");
    if (selectedFeatures.includes("AI Chatbot")) techStack.push("OpenAI API");
    if (selectedFeatures.includes("Authentication")) techStack.push("JWT");
    if (websiteType === "E-Commerce") techStack.push("Redux");

    // Recommended team
    let teamSize = "1 Developer";
    if (complexity === "Medium") teamSize = "2 Developers";
    if (complexity === "High") teamSize = "2-3 Developers";

    // Recommended package
    let packageSuggestion = "Starter";
    if (minCost >= 25000) packageSuggestion = "Business";
    if (minCost >= 50000) packageSuggestion = "Enterprise";

    res.status(200).json({
      success: true,
      data: {
        estimatedCost: { min: minCost, max: maxCost },
        estimatedTime: Math.round(time),
        complexity,
        techStack: [...new Set(techStack)],
        teamSize,
        packageSuggestion,
        summary: `${websiteType} website with ${pages} pages, ${designQuality} design quality${selectedFeatures.length > 0 ? `, featuring ${selectedFeatures.join(", ")}` : ""}.`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
