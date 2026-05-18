const getAIRecommendation = async (req, res) => {
  try {
    const { employeeData } = req.body;
    
    if (!employeeData) {
      return res.status(400).json({ message: 'Employee data is required for recommendation' });
    }

    const prompt = `Analyze the following employee data and provide a promotion recommendation, an employee ranking estimate, training suggestions, and AI feedback generation:
    Name: ${employeeData.name}
    Department: ${employeeData.department}
    Skills: ${employeeData.skills.join(', ')}
    Performance Score: ${employeeData.performanceScore}/100
    Experience: ${employeeData.experience} years
    
    Format the response with clear headings.`;

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
        ],
        "reasoning": {"enabled": true}
      })
    });

    const result = await response.json();
    
    if (result.error) {
      console.error(result.error);
      return res.status(500).json({ message: 'Error from OpenRouter API' });
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
