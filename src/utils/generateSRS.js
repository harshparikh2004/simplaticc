import { genAI } from './geminiClient';

export const generateSRS = async (projectData) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const {
        projectTitle = 'Untitled Project',
        projectDescription = 'No description provided.',
        techStack = 'Not specified',
        diagramTypes = [],
    } = projectData;

    // Format the prompt
    const prompt = `You are a professional software engineer and technical documentation expert. Generate a comprehensive and detailed Software Requirements Specification (SRS) document in compliance with the IEEE 830-1998 standard.
    
    Project Title: ${projectTitle}
    Project Description: ${projectDescription}
    Technology Stack: ${techStack}
    Required Diagrams: ${diagramTypes.join(', ')}

    Your responsibilities include:

    1. Structure the SRS according to IEEE standard sections, including but not limited to:

   - 1. Introduction
     - 1.1 Purpose
     - 1.2 Document Conventions
     - 1.3 Intended Audience and Reading Suggestions
     - 1.4 Project Scope
     - 1.5 References
   - 2. Overall Description
     - 2.1 Product Perspective
     - 2.2 Product Functions
     - 2.3 User Classes and Characteristics
     - 2.4 Operating Environment
     - 2.5 Design and Implementation Constraints
     - 2.6 User Documentation
     - 2.7 Assumptions and Dependencies
   - 3. System Features (detailed functional requirements)
     - Each feature should include: Description, Functional Requirements, Preconditions, Postconditions, and Exceptions
   - 4. External Interface Requirements
     - 4.1 User Interfaces
     - 4.2 Hardware Interfaces
     - 4.3 Software Interfaces
     - 4.4 Communication Interfaces
   - 5. Non-Functional Requirements
     - Performance, Reliability, Security, Maintainability, Scalability, and Usability requirements
   - 6. Other Requirements (Legal, Regulatory, Licensing, etc.)
   - 7. Appendices and Glossary

    2. Include all required diagrams where appropriate based on ${diagramTypes.join(', ')}. Use Mermaid or PlantUML code blocks. Provide meaningful and structured diagrams such as:
   - Use Case Diagram
   - Entity Relationship Diagram (ERD)
   - Data Flow Diagram (DFD)
   - Activity Diagram
   - Class Diagram

    3. Use rich Markdown formatting:
   - Use proper heading levels (e.g., ##, ###)
   - Use bullet points, tables, and code blocks where appropriate
   - Use emphasis, bold, or italics for clarity

    4. Make the content exhaustive and elaborative. Write in formal and professional tone.
    5. Include no additional commentary, instructions, or summary — only the SRS document content.

    Begin the SRS document now based on the provided project details.`.trim();

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (err) {
        console.error('Gemini API Error:', err);
        throw new Error('Failed to generate SRS document.');
    }
};