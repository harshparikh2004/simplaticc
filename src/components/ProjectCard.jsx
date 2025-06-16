import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, Calendar } from "lucide-react";

const getStatusColor = (status) => {
    switch (status) {
        case "Completed":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "In Progress":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
};

export default function ProjectCard({ project }) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-2 right-2 ${getStatusColor(project.status)}`} variant="secondary">
                    {project.status}
                </Badge>
            </div>

            <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {project.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                    })}
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex gap-2 pt-0">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                    </a>
                </Button>
                {project.liveUrl && (
                    <Button size="sm" className="flex-1" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
