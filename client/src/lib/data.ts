import type { Project, Service, Testimonial, ProcessStep, FAQ } from "@shared/schema";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform with AI Recommendations",
    description: "Built a full-featured e-commerce platform with AI-powered product recommendations that increased average order value by 35%.",
    technologies: ["React", "Node.js", "MongoDB", "OpenAI", "Stripe"],
    category: "E-Commerce",
    results: "35% increase in average order value, 50% faster load times",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "SaaS Dashboard for Analytics",
    description: "Developed a comprehensive analytics dashboard that helps businesses track KPIs and make data-driven decisions.",
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Chart.js"],
    category: "SaaS",
    results: "Used by 500+ businesses, 4.8 star rating",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "AI Content Generator Tool",
    description: "Created an AI-powered content generation platform that helps marketers create blog posts, social media content, and ad copy.",
    technologies: ["Next.js", "OpenAI GPT-4", "Prisma", "TailwindCSS"],
    category: "AI Tool",
    results: "10,000+ pieces of content generated monthly",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Real-time Collaboration Platform",
    description: "Built a Notion-like collaboration tool with real-time editing, team workspaces, and document management.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Redis"],
    category: "Productivity",
    results: "15,000+ active users, 99.9% uptime",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Full-Stack Web Development",
    description: "End-to-end web application development using modern technologies like React, Node.js, and MongoDB.",
    icon: "code",
    features: [
      "Custom web applications",
      "API development",
      "Database design",
      "Performance optimization",
    ],
  },
  {
    id: "2",
    title: "AI Integration & Automation",
    description: "Integrate AI capabilities into your existing products or build AI-first applications from scratch.",
    icon: "brain",
    features: [
      "ChatGPT/GPT-4 integration",
      "Custom AI models",
      "Process automation",
      "Intelligent chatbots",
    ],
  },
  {
    id: "3",
    title: "MVP Development",
    description: "Transform your idea into a working product quickly. Perfect for startups and entrepreneurs.",
    icon: "rocket",
    features: [
      "Rapid prototyping",
      "User validation",
      "Scalable architecture",
      "Launch support",
    ],
  },
  {
    id: "4",
    title: "Technical Consulting",
    description: "Get expert advice on your tech stack, architecture decisions, and development strategy.",
    icon: "lightbulb",
    features: [
      "Tech stack review",
      "Architecture planning",
      "Code audits",
      "Team training",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "CEO",
    company: "TechStart India",
    content: "Narendra delivered our MVP in just 6 weeks. His understanding of both technical and business requirements is exceptional. Our platform now serves 10,000+ users.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    role: "Founder",
    company: "GrowthLabs",
    content: "The AI integration Narendra built for our marketing platform increased our efficiency by 300%. He doesn't just code - he solves business problems.",
    rating: 5,
  },
  {
    id: "3",
    name: "Amit Sharma",
    role: "Product Manager",
    company: "FinServe Solutions",
    content: "Working with Narendra was a game-changer. He transformed our outdated system into a modern, scalable application. Highly recommended for complex projects.",
    rating: 5,
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "1",
    step: 1,
    title: "Discovery Call",
    description: "We discuss your project requirements, goals, and timeline. I ask the right questions to understand your business needs.",
    icon: "phone",
  },
  {
    id: "2",
    step: 2,
    title: "Proposal & Planning",
    description: "I create a detailed proposal with timeline, milestones, and pricing. You'll know exactly what you're getting.",
    icon: "file-text",
  },
  {
    id: "3",
    step: 3,
    title: "Development",
    description: "I build your project with regular updates and demos. You're involved at every stage to ensure we're on track.",
    icon: "code-2",
  },
  {
    id: "4",
    step: 4,
    title: "Launch & Support",
    description: "We launch your project together and I provide ongoing support to ensure your success.",
    icon: "rocket",
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What technologies do you specialize in?",
    answer: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have extensive experience with TypeScript, PostgreSQL, AI/ML integrations (OpenAI, Claude), and cloud platforms like AWS and Vercel.",
  },
  {
    id: "2",
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity. A simple MVP can be completed in 2-4 weeks, while complex applications may take 2-3 months. I'll provide a detailed timeline during our discovery call.",
  },
  {
    id: "3",
    question: "What is your pricing structure?",
    answer: "I offer both fixed-price projects and hourly rates depending on the nature of work. For most projects, I prefer fixed-price as it gives you cost certainty. Contact me for a custom quote.",
  },
  {
    id: "4",
    question: "Do you provide post-launch support?",
    answer: "Yes! I offer various support packages ranging from bug fixes to full maintenance. I believe in long-term partnerships with my clients.",
  },
  {
    id: "5",
    question: "Can you work with my existing team?",
    answer: "Absolutely. I regularly collaborate with in-house teams, designers, and other developers. I'm flexible and can adapt to your existing workflows.",
  },
  {
    id: "6",
    question: "What makes you different from other developers?",
    answer: "I'm not just a developer - I'm a product thinker. I help you build solutions that solve real business problems, not just code that works. My AI expertise and focus on ROI sets me apart.",
  },
];

export const contactInfo = {
  name: "Narendra Rawat",
  email: "rawatnitts0524@gmail.com",
  phones: ["9119029863", "9458318755"],
  title: "Full-Stack Developer & AI Solutions Expert",
  tagline: "I build products that grow your business",
};
