import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function ProjectDialog({
  open,
  onClose,
  onSubmit,
  editingProject,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (editingProject) {
      reset({
        title: editingProject.title,
        category: editingProject.category,
        description: editingProject.description,
        technologies: editingProject.technologies?.join(", "),
        image: editingProject.image,
        demoUrl: editingProject.demoUrl,
        githubUrl: editingProject.githubUrl,
        featured: editingProject.featured,
        rating: editingProject.rating || 0,
        ratingsCount: editingProject.ratingsCount || 0,
      });
    } else {
      reset({
        title: "",
        category: "",
        description: "",
        technologies: "",
        image: "",
        demoUrl: "",
        githubUrl: "",
        featured: false,
        rating: 0,
        ratingsCount: 0,
      });
    }
  }, [editingProject, reset]);

  const submit = (data) => {
    data.technologies = data.technologies
      .split(",")
      .map((item) => item.trim());

    onSubmit(data);

    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent className="max-w-2xl rounded-3xl border-slate-800 bg-slate-950 text-white">

        <DialogHeader>

          <DialogTitle className="text-3xl">

            {editingProject ? "Edit Project" : "Add Project"}

          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
        >

          <div>

            <Label>Project Title</Label>

            <Input
              {...register("title")}
              placeholder="Snaplifye Website"
            />

          </div>

          <div>

            <Label>Category</Label>

            <Input
              {...register("category")}
              placeholder="Business"
            />

          </div>

          <div>

            <Label>Description</Label>

            <Textarea
              rows={4}
              {...register("description")}
            />

          </div>

          <div>

            <Label>Technologies</Label>

            <Input
              {...register("technologies")}
              placeholder="React, Node, MongoDB"
            />

          </div>

          <div>

            <Label>Image URL</Label>

            <Input
              {...register("image")}
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <Label>Demo URL</Label>

              <Input
                {...register("demoUrl")}
              />

            </div>

            <div>

              <Label>GitHub URL</Label>

              <Input
                {...register("githubUrl")}
              />

            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <Label>Rating (0-5)</Label>

              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                {...register("rating")}
                placeholder="4.5"
              />

            </div>

            <div>

              <Label>Ratings Count</Label>

              <Input
                type="number"
                min="0"
                {...register("ratingsCount")}
                placeholder="10"
              />

            </div>

          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              {...register("featured")}
            />

            Featured Project

          </label>

          <Button
            type="submit"
            className="w-full"
          >
            {editingProject ? "Update Project" : "Create Project"}
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}

export default ProjectDialog;