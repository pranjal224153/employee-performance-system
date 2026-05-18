const getAIRecommendation = async (req, res) => {
  try {
    const { employeeData } = req.body;
    
    if (!employeeData) {
      return res.status(400).json({ message: 'Employee data is required for recommendation' });
    }

    const prompt = `You are an expert HR performance analyst. Analyze the following employee data and provide a structured report with these 4 sections:
1. **Promotion Recommendation** - Should this employee be promoted? Why or why not?
2. **Employee Ranking** - Rank them relative to peers (Top 10%, Top 25%, etc.) based on their score.
3. **Training Suggestions** - What specific skills or courses should they pursue?
4. **AI Feedback Summary** - A concise professional summary of their performance.

Employee Data:
- Name: ${employeeData.name}
- Role: ${employeeData.role}
- Department: ${employeeData.department}
- Skills: ${employeeData.skills.join(', ')}
- Performance Score: ${employeeData.performanceScore}/100
- Completed Projects: ${employeeData.completedProjects}
- Manager Feedback: "${employeeData.feedback}"

Use clear markdown headings for each section. Be specific and actionable.`;

    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-v4-flash:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });

    const result = await response.json();
    
    if (result.error) {
      console.error('OpenRouter Error:', JSON.stringify(result.error, null, 2));
      return res.status(500).json({ message: result.error.message || 'Error from OpenRouter API' });
    }

    const assistantMessage = result.choices[0].message;

    res.status(200).json({
      recommendation: assistantMessage.content,
      reasoning_details: assistantMessage.reasoning_details || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAIRecommendation
};
