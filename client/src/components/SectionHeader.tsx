import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({ title, subtitle, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", {
      "text-center": align === "center",
      "text-left": align === "left",
      "text-right": align === "right",
    }, className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-1/2 w-16 h-1 bg-primary -translate-x-1/2 rounded-full opacity-80" />
        </h2>
        {subtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mt-6">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
