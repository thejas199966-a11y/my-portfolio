import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Briefcase,
  Workflow,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import profileImage from "@/assets/profile-photo.png";

const PROFILE_DATA = {
  name: "Thejas S",
  title:
    "Software Engineer | ReactJs • React Native • Nodejs • MongoDB • FastAPI | AI Agents Automation & Workflows",
  bio: "Passionate software engineer specializing in full-stack development and AI-driven automation. Building scalable applications and intelligent workflows that solve real-world problems.",
  location: "Bengaluru",
  email: "thejas19996@example.com",
  phone: "+91 82967 89262",
  image: profileImage,
  social: {
    linkedin: "https://www.linkedin.com/in/thejas-thejraj-06/",
    github: "https://github.com/yourprofile",
    twitter: "https://twitter.com/yourprofile", // Added to avoid undefined errors if used
  },
};

const EXPERIENCE = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Your Company",
    period: "2022 - Present",
    description:
      "Leading full-stack development initiatives, building scalable microservices, and implementing AI automation workflows.",
    technologies: ["React", "Node.js", "MongoDB", "FastAPI", "N8N"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Previous Company",
    period: "2020 - 2022",
    description:
      "Developed and maintained multiple client-facing applications using modern web technologies.",
    technologies: ["React Native", "Express", "PostgreSQL", "AWS"],
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "First Company",
    period: "2018 - 2020",
    description:
      "Started career building responsive web applications and learning modern development practices.",
    technologies: ["JavaScript", "React", "Node.js", "MySQL"],
  },
];

const N8N_WORKFLOWS = [
  {
    id: 1,
    name: "AI Customer Support Automation",
    description:
      "Automated customer support workflow using AI to categorize, respond, and escalate tickets intelligently.",
    image:
      "https://images.pexels.com/photos/4330787/pexels-photo-4330787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    technologies: ["N8N", "OpenAI", "Slack", "MongoDB"],
    stats: { nodes: 24, efficiency: "85%" },
  },
  {
    id: 2,
    name: "Multi-Platform Content Distribution",
    description:
      "Workflow that automatically distributes content across multiple social media platforms with AI-powered optimization.",
    image:
      "https://images.unsplash.com/photo-1737505599162-d9932323a889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5vZGVzJTIwbmV0d29yayUyMGF1dG9tYXRpb258ZW58MHx8fHwxNzc0MTgxNTk4fDA&ixlib=rb-4.1.0&q=85",
    technologies: ["N8N", "Twitter API", "LinkedIn API", "Facebook API"],
    stats: { nodes: 32, efficiency: "92%" },
  },
  {
    id: 3,
    name: "Data Pipeline & Analytics Automation",
    description:
      "Complex data extraction, transformation, and loading workflow with real-time analytics and reporting.",
    image:
      "https://images.unsplash.com/photo-1737505599162-d9932323a889?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5vZGVzJTIwbmV0d29yayUyMGF1dG9tYXRpb258ZW58MHx8fHwxNzc0MTgxNTk4fDA&ixlib=rb-4.1.0&q=85",
    technologies: ["N8N", "PostgreSQL", "Redis", "Grafana"],
    stats: { nodes: 41, efficiency: "88%" },
  },
];

const LaptopSection = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full bg-white/5 p-1 rounded-lg border border-white/10 flex gap-1">
          <TabsTrigger
            value="profile"
            className="flex-1 py-2 text-xs rounded-md font-bold mono-font tracking-wider flex items-center justify-center data-[state=active]:bg-cyan-400 data-[state=active]:text-black transition-all"
          >
            <User className="w-3 h-3 mr-2" /> PROFILE
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="flex-1 py-2 text-xs rounded-md font-bold mono-font tracking-wider flex items-center justify-center data-[state=active]:bg-cyan-400 data-[state=active]:text-black transition-all"
          >
            <Briefcase className="w-3 h-3 mr-2" /> EXPERIENCE
          </TabsTrigger>
          <TabsTrigger
            value="workflows"
            className="flex-1 py-2 text-xs rounded-md font-bold mono-font tracking-wider flex items-center justify-center data-[state=active]:bg-cyan-400 data-[state=active]:text-black transition-all"
          >
            <Workflow className="w-3 h-3 mr-2" /> WORKFLOWS
          </TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <div className="md:col-span-1">
              <div className="glass-card rounded-xl p-5 text-center h-full flex flex-col items-center justify-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/30 mb-4">
                  <img
                    src={PROFILE_DATA.image}
                    alt={PROFILE_DATA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white heading-font mb-1">
                  {PROFILE_DATA.name}
                </h3>
                <p className="text-cyan-400 mono-font text-[10px] tracking-widest uppercase mb-4">
                  Software Engineer
                </p>

                <div className="flex justify-center gap-3 mt-auto">
                  <a
                    href={PROFILE_DATA.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE_DATA.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="glass-card rounded-xl p-5">
                <h4 className="text-xs font-bold text-cyan-400 mono-font tracking-widest uppercase mb-3">
                  About
                </h4>
                <p className="text-sm font-semibold text-white body-font leading-relaxed mb-3">
                  {PROFILE_DATA.title}
                </p>
                <p className="text-xs text-gray-400 body-font leading-relaxed">
                  {PROFILE_DATA.bio}
                </p>
              </div>

              <div className="glass-card rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 mono-font tracking-widest uppercase mb-3">
                  Contact
                </h4>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="body-font text-sm">
                    {PROFILE_DATA.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="body-font text-sm hover:text-cyan-400 transition-colors"
                  >
                    {PROFILE_DATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="body-font text-sm">
                    {PROFILE_DATA.phone}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* EXPERIENCE TAB */}
        <TabsContent value="experience" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {EXPERIENCE.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-5 border-l-4 border-cyan-400 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white heading-font mb-1">
                      {job.title}
                    </h4>
                    <p className="text-cyan-400 mono-font tracking-wider uppercase text-xs">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-gray-500 mono-font text-xs mt-1 md:mt-0">
                    {job.period}
                  </span>
                </div>

                <p className="text-gray-400 body-font text-sm mb-4">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-md text-cyan-400 text-[10px] mono-font tracking-wider uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        {/* WORKFLOWS TAB */}
        <TabsContent value="workflows" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {N8N_WORKFLOWS.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl overflow-hidden group border border-white/5 hover:border-cyan-400/30 transition-colors"
              >
                {/* Scaled down image container */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={workflow.image}
                    alt={workflow.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h4 className="text-base font-bold text-white heading-font">
                      {workflow.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <p className="text-gray-400 body-font text-xs line-clamp-2">
                    {workflow.description}
                  </p>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/5 rounded-md p-2 text-center border border-white/5">
                      <p className="text-lg font-bold text-cyan-400 heading-font">
                        {workflow.stats.nodes}
                      </p>
                      <p className="text-[9px] text-gray-500 mono-font uppercase tracking-wider">
                        Nodes
                      </p>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-md p-2 text-center border border-white/5">
                      <p className="text-lg font-bold text-cyan-400 heading-font">
                        {workflow.stats.efficiency}
                      </p>
                      <p className="text-[9px] text-gray-500 mono-font uppercase tracking-wider">
                        Efficiency
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {workflow.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-400 text-[9px] mono-font"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaptopSection;
