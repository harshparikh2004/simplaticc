import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function LoaderOverlay({ isActive, title = "Processing...", subtitle = "Please be patient, this may take a moment" }) {
    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-50 bg-white/70 backdrop-blur-sm"
                >
                    {/* Pulse Animation */}
                    <motion.div
                        className="absolute rounded-full bg-blue-500/20"
                        animate={{
                            scale: [0, 4, 0],
                            opacity: [0.8, 0.3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                        style={{
                            width: "200px",
                            height: "200px",
                        }}
                    />

                    {/* Second pulse for layered effect */}
                    <motion.div
                        className="absolute rounded-full bg-blue-400/15"
                        animate={{
                            scale: [0, 5, 0],
                            opacity: [0.6, 0.2, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.3,
                        }}
                        style={{
                            width: "200px",
                            height: "200px",
                        }}
                    />

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center z-10"
                    >
                        <motion.h2
                            className="text-2xl font-bold text-gray-800 mb-2"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ fontFamily: "Quicksand" }}
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            className="text-gray-600"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ fontFamily: "Quicksand" }}
                        >
                            {subtitle}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoaderOverlay;
