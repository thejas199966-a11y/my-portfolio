import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/7648310/pexels-photo-7648310.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

// PLACEHOLDER: Add your courses and certifications here
const COURSES_CERTIFICATIONS = [
  {
    id: 1,
    title: "Microsoft Azure Developer Associate (AZ-204) Exam Prep",
    type: "Course",
    platform: "Coursera",
    completionDate: "2026",
    image:
      "https://images.pexels.com/photos/7648310/pexels-photo-7648310.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/NBT3AQ998OZ1",
    description: "Microsoft Azure Developer Associate (AZ-204) Exam Prep",
  },
  {
    id: 2,
    title: "Deploy a website with Azure Virtual Machines",
    type: "Certification",
    platform: "Microsoft",
    completionDate: "2026",
    image:
      "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~R8B7CPAZXPB6/CERTIFICATE_LANDING_PAGE~R8B7CPAZXPB6.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/R8B7CPAZXPB6",
    description: "Deploy a website with Azure Virtual Machines",
  },
];

const BookshelfSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <BookOpen className="w-8 h-8 text-cyan-400" />
        <h3 className="text-2xl md:text-3xl font-bold heading-font text-cyan-400 tracking-wider uppercase mono-font">
          Courses & Certifications
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES_CERTIFICATIONS.map((item, index) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
          >
            <motion.div
              data-testid={`course-card-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-xl overflow-hidden group cursor-pointer h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    if (e.target.src !== FALLBACK_IMAGE) {
                      e.target.src = FALLBACK_IMAGE;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-cyan-400/90 text-black px-3 py-1 rounded-full text-xs font-bold mono-font uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h4 className="text-xl font-bold text-white heading-font">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-400 body-font">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xs text-cyan-400 mono-font tracking-wider uppercase">
                      {item.platform}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.completionDate}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BookshelfSection;
