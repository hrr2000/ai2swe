import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Development Stack 2026 | ai2swe",
  description: "A chronological guide from beginner plugins to expert autonomous CLI agents.",
};

const TIERS = [
  {
    id: "beginner",
    level: "Level 1: The Copilot Era (Beginner)",
    description: "Basic autocomplete and isolated chat. You are still writing most of the code, but you have an intelligent assistant helping you with syntax and boilerplate.",
    styleClass: styles.tierBeginner,
    tools: [
      {
        name: "GitHub Copilot",
        type: "IDE Extension",
        description: "The foundational autocomplete tool. It constantly predicts your next lines based on the current file context.",
        tradeoffs: [
          "Excellent for boilerplate and typing speed.",
          "Struggles to refactor across multiple files.",
          "UI is restricted to inline ghosts and a sidebar."
        ]
      },
      {
        name: "ChatGPT / Claude Web",
        type: "Web GUI",
        description: "Copying and pasting code into a browser tab to ask architectural questions or generate isolated regex functions.",
        tradeoffs: [
          "Zero configuration required.",
          "Massive friction: constantly copy/pasting context.",
          "The AI cannot see your local file system or run tests."
        ]
      }
    ]
  },
  {
    id: "intermediate",
    level: "Level 2: AI-Native IDEs (Intermediate)",
    description: "Instead of installing an extension, you use an editor built explicitly around LLMs. The AI natively understands your entire file tree, codebase, and terminal output.",
    styleClass: styles.tierIntermediate,
    tools: [
      {
        name: "Cursor",
        type: "Native IDE",
        description: "A VS Code fork that acts as the 2026 industry standard. Features Cmd+K (inline generation), Cmd+L (codebase chat), and Composer (multi-file agentic edits).",
        tradeoffs: [
          "Zero friction context—sees your terminal errors automatically.",
          "Lag behind upstream VS Code updates slightly.",
          "Composer can overwrite files aggressively without careful review."
        ]
      },
      {
        name: "Windsurf",
        type: "Native IDE",
        description: "Built by Codeium, focusing heavily on background agents traversing your codebase to fix linter errors autonomously while you type.",
        tradeoffs: [
          "Extremely proactive developer experience.",
          "Smaller extension ecosystem than native VS Code.",
          "Sometimes interrupts workflow if the agent guesses incorrectly."
        ]
      }
    ]
  },
  {
    id: "advanced",
    level: "Level 3: Agentic CLIs (Advanced)",
    description: "Moving the AI out of the GUI entirely. You provide a ticket or prompt in your terminal, and the AI autonomously creates files, runs builds, and commits to Git.",
    styleClass: styles.tierAdvanced,
    tools: [
      {
        name: "Aider",
        type: "CLI Tool",
        description: "A terminal agent that pairs with you. You type `aider \"add a dark mode toggle\"` and it reads your codebase, edits the exact files, and issues a Git commit.",
        tradeoffs: [
          "Unparalleled speed for broad, repo-wide refactoring.",
          "Requires strict Git discipline (it commits directly).",
          "Can rack up API costs very fast if using raw Claude 3.5 Sonnet endpoints."
        ]
      },
      {
        name: "OpenHands (SWE-Agent)",
        type: "Docker Agent",
        description: "An isolated containerized AI that can actually execute code, run its own terminal commands, browse the web, and solve complex GitHub Issues completely autonomously.",
        tradeoffs: [
          "Safely isolated from your host machine.",
          "Can take 15+ minutes to solve a complex issue.",
          "Setup requires Docker and moderate devops knowledge."
        ]
      }
    ]
  },
  {
    id: "expert",
    level: "Level 4: Open Protocols & Context Routing (Expert)",
    description: "Treating AI as a pipeline component. You write custom servers that expose your internal databases, JIRA, and logs directly to the LLM.",
    styleClass: styles.tierExpert,
    tools: [
      {
        name: "Model Context Protocol (MCP)",
        type: "Protocol",
        description: "An open standard that allows Cursor or Claude to securely query your local Postgres database or fetch live internal documentation to gain context before writing code.",
        tradeoffs: [
          "Eliminates hallucinations about internal proprietary systems.",
          "Requires writing and maintaining custom Node/Python MCP servers.",
          "High initial configuration cost."
        ]
      },
      {
        name: "CI/CD Auto-Reviewers",
        type: "Infrastructure",
        description: "GitHub Actions powered by Vercel AI SDK that automatically review PRs, suggest inline architectural fixes, and run security audits before humans look at the code.",
        tradeoffs: [
          "Massive time saver for senior reviewers.",
          "Can produce noisy or pedantic comments if prompted poorly.",
          "Requires rigorous CI integration."
        ]
      }
    ]
  },
  {
    id: "orchestration",
    level: "Level 5: Multi-Agent Swarms & Orchestration",
    description: "Single agents hit contextual ceilings. Multi-agent orchestration frameworks partition logic so a 'Manager' agent delegates to a 'Coder' agent, which is then reviewed by a 'QA' agent.",
    styleClass: styles.tierOrchestration,
    tools: [
      {
        name: "LangGraph / CrewAI",
        type: "Framework",
        description: "Libraries for building stateful, multi-actor applications. You explicitly define nodes (agents) and edges (how they pass data between each other) as a computational graph.",
        tradeoffs: [
          "Can tackle extremely complex, multi-stage data pipelines.",
          "Requires significant boilerplate and graph-theory mental models.",
          "High token burn rates due to agents chatting with each other constantly."
        ]
      },
      {
        name: "Swarm (OpenAI Protocol)",
        type: "SDK",
        description: "A lightweight, stateless multi-agent framework demonstrating how agents can dynamically 'handoff' routines and responsibilities to other specialized agents.",
        tradeoffs: [
          "Extremely simple API surface compared to LangGraph.",
          "Lacks built-in memory or robust state persistence.",
          "Highly experimental architecture."
        ]
      }
    ]
  },
  {
    id: "evaluation",
    level: "Level 6: Agentic Test Harnesses & Evals",
    description: "The absolute bleeding edge in 2026. How do you know if your agent actually wrote good code? You run it inside a deterministic Evaluation Harness sandbox built to automatically grade LLM outputs.",
    styleClass: styles.tierEvaluation,
    tools: [
      {
        name: "SWE-bench Test Harness",
        type: "Evaluation Harness",
        description: "The gold standard for evaluating AI. It spins up a Dockerized environment, applies an agent's generated PR, runs a massive suite of unit tests, and scores the agent definitively.",
        tradeoffs: [
          "Deterministic, indisputable proof of an AI's coding capability.",
          "Notoriously difficult to configure locally for private proprietary repositories.",
          "Requires colossal compute overhead to spin up vast arrays of isolated containers."
        ]
      },
      {
        name: "LLM-as-a-Judge (LangSmith / Evals)",
        type: "Observability",
        description: "When code isn't easily unit testable, you use superior proxy models (like GPT-4.5) specifically instructed to critique and grade the output of your working agent.",
        tradeoffs: [
          "Crucial for identifying regressions in your AI pipeline.",
          "Adds latency and fundamentally doubles your inference costs.",
          "Judging models can suffer from 'sycophancy' or bias toward their own model family."
        ]
      }
    ]
  },
  {
    id: "ai-tdd",
    level: "Level 7: AI-Generated Tests & Mutation Testing",
    description: "AI writes the tests, not just the code. Mutation testing frameworks then automatically verify that the AI-generated test suite is actually robust — not just passing on green.",
    styleClass: styles.tierTdd,
    tools: [
      {
        name: "CodiumAI / Qodo",
        type: "Test Generator",
        description: "Analyzes your functions, infers business intent, and generates edge-case test suites automatically — including corner cases that humans would never think to write.",
        tradeoffs: [
          "Generates meaningful tests with contextual understanding.",
          "Can produce redundant or low-value tests if the function signature is ambiguous.",
          "Works best when paired with a human review step."
        ]
      },
      {
        name: "Stryker / Mutation Testing",
        type: "Test Quality Harness",
        description: "Deliberately introduces subtle bugs (mutations) into your code and verifies the test suite catches them. Used to grade the quality of AI-generated tests.",
        tradeoffs: [
          "Objectively proves your tests are meaningful, not just coverage theater.",
          "Can be extremely slow on large codebases.",
          "Requires careful configuration of which mutations are semantically meaningful."
        ]
      },
      {
        name: "Pact / Contract Testing with AI",
        type: "Integration Tests",
        description: "AI generates consumer-driven contract tests between microservices by reading the OpenAPI spec of both services simultaneously.",
        tradeoffs: [
          "Eliminates massive categories of integration failures in distributed systems.",
          "Requires OpenAPI specs to be complete and accurate.",
          "The AI may misinterpret non-standard custom schema extensions."
        ]
      }
    ]
  },
  {
    id: "memory",
    level: "Level 8: Persistent Memory & Long-Running Agents",
    description: "Standard LLM calls are stateless. Level 8 is about giving your agents the equivalent of a database — persistent memory, user preferences, and accumulated learned context that survives between sessions.",
    styleClass: styles.tierMemory,
    tools: [
      {
        name: "Mem0 / Zep",
        type: "Agent Memory Layer",
        description: "Drop-in persistent memory backends for AI. Every user interaction is automatically summarized and stored as a searchable vector. Future calls retrieve relevant past memories automatically.",
        tradeoffs: [
          "Dramatically improves multi-session personalization and context continuity.",
          "Memory poisoning is a real attack vector if user input is not sanitized.",
          "Adds latency for the retrieval step and storage costs for the vector store."
        ]
      },
      {
        name: "LangGraph + Redis State",
        type: "State Management",
        description: "Long-running agent workflows need a state store to checkpoint progress. LangGraph checkpoints graph execution state to Redis so a 3-hour agent can survive a process crash.",
        tradeoffs: [
          "Essential for production-grade autonomous agents that run for hours.",
          "Debugging an agent's state machine mid-execution is highly complex.",
          "Redis infra must be maintained separately from your application."
        ]
      },
      {
        name: "A2A Protocol (Google)",
        type: "Agent-to-Agent Protocol",
        description: "An open protocol (2025) for agents to communicate, delegate and share tasks across organizational boundaries — the HTTP of the multi-agent internet.",
        tradeoffs: [
          "Enables truly composable autonomous workforces of specialized agents.",
          "Extremely early-stage; tooling and debugging are scarce.",
          "Trust and security boundaries between cross-org agents are unsolved."
        ]
      }
    ]
  },
  {
    id: "autonomous",
    level: "Level 9: Fully Autonomous Engineering (Frontier)",
    description: "The final frontier: AI systems that operate entire development loops with minimal human intervention. They read tickets, write code, run tests, open PRs, and handle review feedback — all without a human in the loop.",
    styleClass: styles.tierAutonomous,
    tools: [
      {
        name: "Devin (Cognition Labs)",
        type: "Autonomous Engineer",
        description: "The most famous SWE Agent. Given a natural language ticket, Devin opens a browser, configures a dev environment, writes code, debugs terminal output, and opens a pull request entirely autonomously.",
        tradeoffs: [
          "Benchmarks at senior-engineer level on isolated, well-defined tasks.",
          "Fails unpredictably on ambiguous tickets with insufficient context.",
          "Prohibitively expensive per task — cost control is the #1 operational challenge."
        ]
      },
      {
        name: "Google Jules",
        type: "Autonomous Engineer",
        description: "Google's async coding agent (2025). Directly integrated into GitHub, Jules checks out your repo branch, completes a task, and opens a PR for human review — runs overnight while you sleep.",
        tradeoffs: [
          "Deeply integrated with Google infrastructure and Gemini models.",
          "Async execution model requires careful issue-writing discipline.",
          "Limited availability outside of the Google Workspace ecosystem."
        ]
      },
      {
        name: "METR / SWE-bench Verified",
        type: "Safety & Eval Harness",
        description: "The most rigorous benchmarking and safety evaluation harnesses for fully autonomous AI engineers. Tests agents on real GitHub issues from real open-source repos in fully isolated sandboxes.",
        tradeoffs: [
          "The definitive signal for production-readiness of any autonomous agent.",
          "Running private evaluations requires massive cloud compute and DevOps expertise.",
          "Benchmark saturation is starting — new harder evals are already being designed."
        ]
      }
    ]
  }
];

export default function ToolsStackPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>The 2026 Developer Stack</h1>
        <p className={styles.subtitle}>
          If you are late to AI-assisted development, start at Level 1 and work your way down. 
          Here is how modern engineering teams are utilizing LLMs, from simple autocomplete to autonomous CLI agents.
        </p>
      </header>

      <div className={styles.timeline}>
        {TIERS.map((tier) => (
          <section key={tier.id} className={`${styles.tier} ${tier.styleClass}`}>
            <div className={styles.tierBadge} aria-hidden />
            
            <div className={styles.tierHeader}>
              <h2>{tier.level}</h2>
              <p className={styles.tierDesc}>{tier.description}</p>
            </div>

            <div className={styles.toolGrid}>
              {tier.tools.map((tool) => (
                <div key={tool.name} className={styles.toolCard}>
                  <div className={styles.toolHeader}>
                    <span className={styles.toolName}>{tool.name}</span>
                    <span className={styles.toolType}>{tool.type}</span>
                  </div>
                  <p className={styles.toolDescription}>{tool.description}</p>
                  
                  <div className={styles.tradeoffs}>
                    <span className={styles.tradeoffTitle}>Tradeoffs & Details</span>
                    <ul className={styles.tradeoffList}>
                      {tool.tradeoffs.map((tradeoff, idx) => (
                        <li key={idx} className={styles.tradeoffItem}>{tradeoff}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
