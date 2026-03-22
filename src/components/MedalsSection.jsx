import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";

// PLACEHOLDER: Add your awards and recognitions here
const AWARDS = [
  {
    id: 1,
    title: "Budding Rockstar",
    organization: "SLK Software",
    date: "2023",
    description: "Recognized for budding rockstar",
    icon: Trophy,
    image:
      "https://images.pexels.com/photos/6120392/pexels-photo-6120392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 2,
    title: "Shining Star",
    organization: "SLK SOftware",
    date: "2024",
    description:
      "Awarded for exceptional contributions to full-stack development",
    icon: Award,
    image:
      "https://images.pexels.com/photos/6120392/pexels-photo-6120392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 3,
    title: "Stellar Team Awardee",
    organization: "SLK Software",
    date: "2025",
    description: "First place in the team award",
    icon: Trophy,
    image:
      "https://images.pexels.com/photos/6120392/pexels-photo-6120392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const MedalsSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Trophy className="w-8 h-8 text-cyan-400" />
        <h3 className="text-2xl md:text-3xl font-bold heading-font text-cyan-400 tracking-wider uppercase mono-font">
          Awards & Recognition
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AWARDS.map((award, index) => {
          const IconComponent = award.icon;
          return (
            <motion.div
              key={award.id}
              data-testid={`award-card-${award.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card rounded-xl p-6 group cursor-pointer"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xl font-bold text-white heading-font">
                      {award.title}
                    </h4>
                    <IconComponent className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  </div>

                  <p className="text-cyan-400 mono-font text-sm uppercase tracking-wider">
                    {award.organization}
                  </p>
                  <p className="text-gray-400 body-font text-sm">
                    {award.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs text-gray-500 mono-font">
                      {award.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MedalsSection;
