"use client";

import Image, {type StaticImageData} from "next/image";
import {
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import jlaja1 from "../project_assets/Jlaja 1.png";
import jlaja2 from "../project_assets/Jlaja 2.png";
import jlaja3 from "../project_assets/Jlaja 3.png";
import jlaja4 from "../project_assets/Jlaja 4.png";
import projectManager1 from "../project_assets/Project Manager 1.png";
import projectManager2 from "../project_assets/Project Manager 2.png";
import projectManager3 from "../project_assets/Project Manager 3.png";
import projectManager4 from "../project_assets/Project Manager 4.png";
import projectManager5 from "../project_assets/Project Manager 5.png";
import raceYourself1 from "../project_assets/race yourself 1.png";
import raceYourself2 from "../project_assets/race yourself 2.png";
import stateManager1 from "../project_assets/state manager 1.png";
import stateManager2 from "../project_assets/state manager 2.png";
import stateManager3 from "../project_assets/state manager 3.png";
import stateManager4 from "../project_assets/state manager 4.png";

type ButtonProps = {
  children: ReactNode;
  href: string;
  primary?: boolean;
  rel?: string;
  target?: string;
};

function Button({children, href, primary = false, rel, target}: ButtonProps) {
  const style = primary
    ? "border-sky-400 bg-sky-400 text-slate-950 hover:bg-sky-300"
    : "border-slate-700 hover:border-sky-400 hover:text-sky-400";

  return (
    <a
      className={`border px-5 py-3.5 text-xs font-bold transition-colors ${style}`}
      href={href}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
}

function Tag({children}: {children: ReactNode}) {
  return <span className="text-[10px] uppercase text-sky-400">{children}</span>;
}

type Project = {
  title: string;
  role: string;
  description: string;
  tags: string[];
  images: StaticImageData[];
  link?: string;
  paper?: string;
};

function ProjectCard({project}: {project: Project}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

  const openDetails = () => setIsDetailsOpen(true);
  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  };
  const stopCardClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <article
      aria-label={`Open details for ${project.title}`}
      className="flex h-full cursor-pointer flex-col border border-slate-700 p-4 transition-colors hover:border-sky-400 md:p-6"
      onClick={openDetails}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      {project.images.length > 0 ? (
        <div
          className="group relative mb-6 aspect-[16/9] overflow-hidden bg-slate-950"
          onClick={stopCardClick}
        >
          <Image
            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
            className="object-contain p-2 transition-opacity duration-300"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={project.images[currentImageIndex]}
          />

          {project.images.length > 1 ? (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-1 top-1/2 z-10 -translate-y-1/2 bg-transparent px-2 py-3 text-2xl leading-none text-slate-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all hover:scale-110 hover:text-sky-400 md:opacity-0 md:group-hover:opacity-70"
                onClick={prevImage}
              >
                <span aria-hidden="true">◀</span>
              </button>
              <button
                aria-label="Next image"
                className="absolute right-1 top-1/2 z-10 -translate-y-1/2 bg-transparent px-2 py-3 text-2xl leading-none text-slate-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all hover:scale-110 hover:text-sky-400 md:opacity-0 md:group-hover:opacity-70"
                onClick={nextImage}
              >
                <span aria-hidden="true">▶</span>
              </button>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1">
                {project.images.map((_, index) => (
                  <button
                    aria-label={`Go to image ${index + 1}`}
                    className={`h-1 w-4 transition-colors ${
                      index === currentImageIndex
                        ? "bg-sky-400"
                        : "bg-slate-600 hover:bg-slate-400"
                    }`}
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
      <p className="mb-4 text-xs uppercase tracking-widest text-slate-400">
        {project.role}
      </p>
      <p className="line-clamp-4 min-h-[6rem] overflow-hidden text-sm leading-relaxed text-slate-400 text-justify">
        {project.description}
      </p>
      <div className="mt-6 min-h-10 flex flex-wrap content-start gap-3">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      {project.link ? (
        <a
          className="mt-6 inline-block text-xs font-bold uppercase text-sky-400 hover:text-sky-300"
          href={project.link}
          rel="noreferrer"
          target="_blank"
          onClickCapture={stopCardClick}
        >
          View on GitHub →
        </a>
      ) : null}
      {project.paper ? (
        <a
          className="mt-6 inline-block text-xs font-bold uppercase text-sky-400 hover:text-sky-300"
          href={project.paper}
          rel="noreferrer"
          target="_blank"
          onClickCapture={stopCardClick}
        >
          Read paper →
        </a>
      ) : null}
      {isDetailsOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              event.stopPropagation();
              setIsDetailsOpen(false);
            }
          }}
        >
          <div
            aria-label={`${project.title} details`}
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-slate-600 bg-slate-900 p-6 shadow-2xl md:p-8"
            onClick={stopCardClick}
            role="dialog"
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-3xl font-bold">{project.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">
                  {project.role}
                </p>
              </div>
              <button
                aria-label="Close project details"
                className="text-2xl leading-none text-slate-400 hover:text-sky-400"
                onClick={() => setIsDetailsOpen(false)}
              >
                ×
              </button>
            </div>
            {project.images[0] ? (
              <div className="group relative mb-6 aspect-[16/9] overflow-hidden bg-slate-950">
                <Image
                  alt={`${project.title} screenshot`}
                  className="object-contain p-2"
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  src={project.images[currentImageIndex]}
                />
                {project.images.length > 1 ? (
                  <>
                    <button
                      aria-label="Previous image"
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-transparent px-2 py-3 text-2xl leading-none text-slate-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all hover:scale-110 hover:text-sky-400"
                      onClick={prevImage}
                    >
                      <span aria-hidden="true">◀</span>
                    </button>
                    <button
                      aria-label="Next image"
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-transparent px-2 py-3 text-2xl leading-none text-slate-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all hover:scale-110 hover:text-sky-400"
                      onClick={nextImage}
                    >
                      <span aria-hidden="true">▶</span>
                    </button>
                    <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1">
                      {project.images.map((_, index) => (
                        <button
                          aria-label={`Go to image ${index + 1}`}
                          className={`h-1 w-4 transition-colors ${
                            index === currentImageIndex
                              ? "bg-sky-400"
                              : "bg-slate-600 hover:bg-slate-400"
                          }`}
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
            <p className="text-sm leading-relaxed text-slate-300">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

const projects: Project[] = [
  {
    title: "Jlaja",
    role: "Full-Stack Developer",
    description:
      "An AI-assisted travel application designed to simplify and enhance the travel experience by offering an all-in-one platform for users to efficiently plan, organize, and manage trips. Equipped with AI capabilities, the application allows users to collaboratively build detailed itineraries, track shared expenses, and stay connected with travel groups in real time.",
    tags: [
      "Java",
      "Kotlin",
      "Firebase",
      "Figma",
      "GitHub",
      "Mobile Development",
      "Collaborative App",
      "AI Integration",
    ],
    images: [jlaja1, jlaja2, jlaja3, jlaja4],
    link: "https://github.com/Sam-Gunawan/Jlaja",
  },
  {
    title: "State Manager",
    role: "Solo Developer - Full-Stack",
    description:
      "A full-stack internal web application developed to streamline the management of data requests. The system enables users to track requests from initial submission to final resolution while providing clear visibility into progress. Key implementations include dedicated request views, task lists for workers, workflow state advancement, detailed request views, and a statistical dashboard that visualizes request volumes and statuses within specific timeframes. The application is built using responsive Angular components, RESTful Golang backend services for authentication and workflow management, and a normalized PostgreSQL database.",
    tags: [
      "Angular",
      "TypeScript",
      "HTML",
      "CSS",
      "Go",
      "PostgreSQL",
      "Vercel",
      "Supabase",
      "REST API",
      "Database Design",
      "Authentication",
      "Workflow Management",
    ],
    images: [stateManager1, stateManager2, stateManager3, stateManager4],
  },
  {
    title: "Project Manager",
    role: "Solo Developer - Full-Stack",
    description:
      "A centralized web application designed to streamline software development and enhance project management. The platform empowers project managers to seamlessly create, edit, and manage projects while allowing developers, testers, and designers to view and progress assigned tasks. Comprehensive features include detailed project planning, task assignment, bug tracking, workflow automation, role-based access control, and dynamic Gantt chart visualization for tracking project timelines.",
    tags: [
      "Angular",
      "TypeScript",
      "HTML",
      "CSS",
      "Go",
      "PostgreSQL",
      "Vercel",
      "Supabase",
      "REST API",
      "Project Management",
      "Gantt Chart",
      "Role-Based Access Control",
    ],
    images: [
      projectManager1,
      projectManager2,
      projectManager3,
      projectManager4,
      projectManager5,
    ],
  },
  {
    title: "Race Yourself",
    role: "Software Developer and Circuit Designer",
    description:
      "A visual feedback system engineered to enhance athletic training by providing accessible real-time guidance. The system utilizes a network of sensors to capture position and speed data, which is instantly processed by a microcontroller and visualized on an LED strip to offer engaging visual learning and instant feedback. A standout feature is the ghost mode, which records an initial performance and projects it as a pacer light on the LEDs during subsequent runs to create tangible self-competition. This hardware-integrated system is registered as an Intellectual Property.",
    tags: [
      "C",
      "C++",
      "Python",
      "Hardware Integration",
      "Microcontroller",
      "Circuit Design",
      "Sensor Processing",
      "Intellectual Property (HAKI)",
    ],
    images: [raceYourself1, raceYourself2],
    link: "https://github.com/Sam-Gunawan/race-yourself",
  },
  {
    title: "Gerobakku",
    role: "Full-Stack Developer",
    description:
      "A real-time vendor location tracking application backend developed as a collaborative group project. The architecture implements spatial database schemas for tracking coordinates, robust FastAPI routes for data communication, and simulation scripts to thoroughly test real-time location updates. The backend ensures efficient and accurate geographic data handling for live vendor mapping.",
    tags: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "PostGIS",
      "Backend Development",
      "Real-Time Tracking",
      "API Design",
      "Spatial Database",
      "GitHub",
      "Group Project",
    ],
    images: [],
    link: "https://github.com/Sam-Gunawan/Gerobakku",
  },
  {
    title: "Root-Knot Nematode Multi-Detection and Classification",
    role: "AI Research Project",
    description:
      "A computer vision research project focusing on the development of a two-stage deep learning system for detecting and classifying root-knot nematode species directly from uncropped microscopic images. The architecture leverages YOLOv11n-seg for precise instance segmentation and RepVGG for robust classification. The complete pipeline achieves 88 percent image-level accuracy with a 138.14 ms average end-to-end inference latency, serving as a highly effective diagnostic tool.",
    tags: [
      "Computer Vision",
      "YOLOv11n-seg",
      "RepVGG",
      "Deep Learning",
      "Image Segmentation",
      "Image Classification",
      "AI Research",
      "Python",
    ],
    images: [],
    paper: "/papers/root-knot-nematode-classification.pdf",
  },
  {
    title: "Traffic State Prediction",
    role: "AI Research Project - Group",
    description:
      "An artificial intelligence research project resulting in a co-authored IEEE published paper for the 2025 Tenth International Conference. The research presents a two-stage framework for time-series traffic state prediction and binary forecasting. The system utilizes Long Short-Term Memory networks to capture temporal dependencies in vehicle-count sequences and employs LightGBM to classify dense versus normal traffic conditions. The framework achieves 83.4 percent accuracy while maintaining RMSE and MAE metrics below 0.2.",
    tags: [
      "LSTM",
      "LightGBM",
      "Time-Series Forecasting",
      "Artificial Intelligence",
      "Machine Learning",
      "IEEE Publication",
      "Data Analysis",
      "Python",
    ],
    images: [],
    paper: "/papers/traffic-state-prediction.pdf",
  },
];

const competencies = [
  [
    "01",
    "Languages",
    <>
      TypeScript / Go / JavaScript / Python / Java
      <br />
      Kotlin / C / C++ / SQL / HTML / CSS
    </>,
  ],
  [
    "02",
    "Technologies",
    <>
      Angular / FastAPI / REST APIs / PostgreSQL / PostGIS
      <br />
      Supabase / Vercel / Firebase / Git / Figma
    </>,
  ],
  [
    "03",
    "Artificial Intelligence",
    <>
      Computer Vision / Time-Series Forecasting
      <br />
      YOLOv11n-seg / RepVGG-CA / LSTM / LightGBM
    </>,
  ],
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <nav
        className="mx-auto bg-[#0f172a] flex h-[72px] max-w-[1500px] items-center justify-between px-6 md:h-[60px] md:px-12 sticky top-0 z-50"
        aria-label="Main navigation"
      >
        <a className="text-lg font-extrabold" href="#top">
          Evan Aditya Chandra
        </a>
        <div className="hidden gap-6 text-xs uppercase tracking-widest text-slate-400 md:flex">
          <a className="hover:text-sky-400" href="#about">
            About
          </a>
          <a className="hover:text-sky-400" href="#projects">
            Projects
          </a>
          <a className="hover:text-sky-400" href="#contact">
            Contact
          </a>
        </div>
      </nav>

      <section
        className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-12 pt-14 md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-16 md:px-12 md:pb-14 md:pt-16"
        id="about"
      >
        <div className="max-w-4xl">
          <h1 className="mb-8 text-[clamp(3.25rem,7vw,6rem)] font-bold leading-[1.04] tracking-[-.07em]">
            Full-Stack Developer <em className="text-sky-400">&amp;</em>
            <br /> AI Engineer.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-400 text-justify">
            I am a Computer Science and Electrical Engineering graduate from the
            dual-degree program at Sampoerna University and the University of
            Arizona. Experienced in full-stack web, mobile, and
            hardware-integrated software development using Angular, Golang,
            PostgreSQL, Kotlin, C, and C++. Highly adaptable and eager to
            leverage diverse technical skills and scientific analysis to build
            functional solutions that streamline workflows, simplify complex
            tasks, optimize and enhance operational efficiency
          </p>
          <div className="mt-8 flex flex-wrap gap-4 md:gap-6">
            <Button href="#projects" primary>
              View Projects
            </Button>
            <Button
              href="/papers/Evan%20Aditya%20Chandra%20CV.pdf"
              rel="noreferrer"
              target="_blank"
            >
              Download CV
            </Button>
          </div>
        </div>
        <div className="pl-6 md:mb-1 border-l border-slate-200 border-solid">
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">
            Currently based in
          </p>
          <p className="mb-7 leading-relaxed">
            North Jakarta,
            <br />
            Indonesia
          </p>
          <div className="my-6 border-t border-slate-700" />
          <p className="mb-2 text-xs uppercase tracking-widest text-slate-400">
            Focus areas
          </p>
          <p className="text-sm leading-loose text-slate-400">
            Software development
            <br />
            AI systems
            <br />
            Hardware integration
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] border-t border-slate-700 px-6 pt-0 pb-6 md:px-12 md:pb-10">
        <div className="grid gap-0 md:grid-cols-3">
          {competencies.map(([number, title, skills]) => (
            <div
              className="border-t border-slate-700 py-5 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              key={number as string}
            >
              <div className="mb-4 flex items-baseline gap-4">
                <span className="text-xs text-sky-400">{number}</span>
                <h3 className="font-bold">{title}</h3>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-400">
                  {skills}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-800 py-10 md:py-16" id="projects">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12">
          <div className="mb-12 md:flex md:items-end md:justify-between">
            <h2 className="text-[clamp(2.375rem,5vw,4rem)] font-bold leading-none tracking-[-.06em]">
              Projects
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <footer
        className="mx-auto grid max-w-[1500px] gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28"
        id="contact"
      >
        <div>
          <h2 className="text-[clamp(2.375rem,5vw,4rem)] font-bold leading-none tracking-[-.06em]">
            Contact me
          </h2>
        </div>
        <div className="md:justify-self-end md:pt-10">
          <a
            className="mb-6 block text-2xl leading-tight text-sky-400"
            href="mailto:Evanaditya18@gmail.com"
          >
            Evanaditya18@gmail.com
          </a>
          <p className="text-sm leading-relaxed text-slate-400">
            North Jakarta, Jakarta
            <br />
            +62 823 1228 3399
          </p>
        </div>
        <div className="flex justify-between border-t border-slate-700 pt-5 text-xs uppercase tracking-widest text-slate-400 md:col-span-2">
          <span>© 2026 Evan Aditya Chandra</span>
          <a className="hover:text-sky-400" href="#top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
