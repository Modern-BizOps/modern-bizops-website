import Link from "next/link";
import StatCards from "@/components/learn/StatCards";
import ContrastColumns from "@/components/learn/ContrastColumns";
import { TRAINING } from "@/lib/offers";

const h2 = "font-display font-semibold text-navy text-2xl mt-10 mb-3";
const link = "text-navy underline";

// The two analyst sources the draft places in "The gap is not adoption
// anymore". Both fetched live on 2026-09-21 at publish time and every figure
// quoted below confirmed on the page: BCG (close to 12,000 respondents, 74%
// AI users, 36% adequate upskilling, 72% shifted expectations) and Thomson
// Reuters (1,816 professionals, 62 countries, 43% not equipped or trained, 47%
// tools not in place, 35% strategy not visible).
const BCG_URL =
  "https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools";
const TR_URL =
  "https://legal.thomsonreuters.com/blog/legal-future-of-professionals-executive-summary/";

// Verbatim transcription of the approved SEO loop cycle 2 asset 8 source copy
// (Marketing Systems/SEO Pilot/pending-approval/aeo-8-ai-training-for-
// employees.md, drafted 2026-09-08, approved by Bradley and published
// 2026-09-21). Rung 4's search-surface page. The training name and price
// interpolate from lib/offers.js (TRAINING) so the number here can never
// disagree with the services page. Company voice, like the rest of the
// Buying AI Automation cluster: it publishes "our" price and carries no
// first-person aside.
export default function AiTrainingForEmployeesBody() {
  return (
    <>
      <p>
        AI training for employees is a program that teaches your team to use
        the AI tools your company already pays for, on your own processes and
        your own data. Corporate programs run from free vendor courses to
        five-figure custom engagements. Ours is {TRAINING.price}. The price is
        not the part that decides whether it works. What decides it is whether
        the training is built on your processes or on somebody&rsquo;s generic
        curriculum, and whether the data underneath those processes is good
        enough for the answers to be worth anything.
      </p>
      <p>
        Most of the programs you will find are the second kind. They teach
        prompting, they teach tool literacy, they hand out a certificate, and
        three weeks later the team is back to doing the work the way it did
        before. That is not a training-quality problem. It is a scope problem,
        and it is fixable.
      </p>

      <h2 className={h2}>The gap is not adoption anymore</h2>
      <p>Your team is already using AI. That part is over.</p>
      <p>
        In BCG&rsquo;s 2026{" "}
        <a
          href={BCG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          AI at Work survey
        </a>{" "}
        of close to 12,000 frontline employees, managers and leaders across
        more than a dozen global markets, 74% of frontline employees now
        describe themselves as AI users. In the same survey, only 36% feel they
        have received adequate upskilling, and 72% say expectations for the
        skills they need have shifted.
      </p>
      <p>
        Thomson Reuters found the same shape from a different angle. Its{" "}
        <a
          href={TR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          Future of Professionals Report 2026
        </a>{" "}
        surveyed 1,816 professionals across law, tax, audit, compliance, risk
        and global trade in 62 countries. When the intended way of working did
        not happen, 43% said people were not equipped or trained to work that
        way, and 47% said the right tools were not in place. Even inside
        organizations that have a named AI strategy, 35% said it is not visible
        in how work actually gets done.
      </p>
      <p>
        Read those together and the picture is specific. People are using AI.
        Almost nobody has been taught to use it on the work their company
        actually does. The training gap is not a literacy gap. It is a
        translation gap, from a general-purpose tool to a particular
        company&rsquo;s process.
      </p>

      {/* The draft note's benchmark stat cards: 36% adequate upskilling (BCG
          2026) and 43% not equipped or trained (Thomson Reuters 2026). Both
          descriptions are condensed from the two paragraphs above; no new
          number and no new claim. */}
      <StatCards
        label="The benchmarks"
        title="The training gap is a translation gap"
        stats={[
          {
            big: "36%",
            desc: "of frontline employees feel they have received adequate upskilling, in a survey where 74% describe themselves as AI users.",
            source: "BCG, AI at Work, 2026",
          },
          {
            big: "43%",
            desc: "said people were not equipped or trained to work that way when the intended way of working did not happen.",
            source: "Thomson Reuters, Future of Professionals Report 2026",
          },
        ]}
      />

      <h2 className={h2}>Training and development are different things</h2>
      <p>
        This distinction matters more than any curriculum decision you will
        make, so it is worth being blunt about it.
      </p>
      <p>
        You can train someone to use the tools of the profession better. You
        have to develop soft skills. Those are two different activities on two
        different clocks, and a program that promises both in a day is selling
        you one and calling it both.
      </p>
      <p>
        Tool training is teachable in a session. Which model to reach for, how
        to structure a prompt, where the company&rsquo;s data is allowed to go,
        what the tool does badly and how to catch it. That is real, useful, and
        it compresses into a working program.
      </p>
      <p>
        Judgement does not compress. Knowing when the answer is wrong, knowing
        which customer to call instead of emailing, knowing that the number
        looks right and the story behind it does not, all of that develops over
        months of doing the work with feedback. A vendor selling you a half-day
        workshop that develops judgement is selling you a certificate.
      </p>
      <p>
        The practical version of this rule: buy training for the tools, and
        build the development into how the team already works, through
        coaching and review, not through a course.
      </p>

      {/* The draft note's comparison graphic: train the tools versus develop
          the judgement. Every item is condensed or quoted from the four
          paragraphs above. */}
      <ContrastColumns
        label="Two different activities"
        title="Two different activities on two different clocks"
        leftTitle="Training the tools"
        leftItems={[
          "Teachable in a session.",
          "Which model to reach for, how to structure a prompt, where the company's data is allowed to go.",
          "What the tool does badly and how to catch it.",
          "Buy it: it compresses into a working program.",
        ]}
        rightTitle="Developing the judgement"
        rightItems={[
          "Does not compress.",
          "Knowing when the answer is wrong, and that the number looks right while the story behind it does not.",
          "Develops over months of doing the work with feedback.",
          "Build it into how the team already works, through coaching and review, not through a course.",
        ]}
      />

      <h2 className={h2}>Why most AI training does not stick</h2>
      <p>Here is the pattern, and it is consistent enough to plan around.</p>
      <p>
        A team goes through a training program. Everyone leaves able to use the
        tool. Nobody leaves with a system on top of that use. Nothing encodes
        what was learned. Nothing identifies what should be automated next.
        Three months later the company can tell you its people use AI every day
        and cannot tell you a single process that changed because of it.
      </p>
      <p>
        Daily use tells you your team is curious. Whether the data and the
        process underneath hold up when you point AI at real work is a
        different question, and the training almost never asks it.
      </p>
      <p>
        That question is the whole thing. AI amplifies the operational state it
        is applied to. Point a well-trained team at a customer database with
        duplicate records and half-empty fields, and you get confident wrong
        answers faster than you got them before. The training was fine. The
        foundation was not.
      </p>
      <p>
        If you are not sure which of those two you are dealing with, the free
        AI Revenue Scan tells you in about five minutes:{" "}
        <Link href="/scorecard" className={link}>
          take the scan
        </Link>
        .
      </p>

      <h2 className={h2}>What a program worth buying actually covers</h2>
      <p>
        Four things. If a proposal is missing one of them, it is a curriculum,
        not a program.
      </p>
      <p>
        <strong>Your tools, not a tool tour.</strong> The team should be
        trained on the licences you already pay for, on the accounts they
        already have, in the week they are already working. A course that
        teaches a platform you do not own teaches nothing you can use on
        Monday.
      </p>
      <p>
        <strong>Your processes, written down first.</strong> To teach someone
        to run a process with AI, somebody has to write the process down. That
        step is usually where the value is, because most companies discover in
        the writing that the process has three undocumented forks and two
        people who do it differently. This is unglamorous and it is the part
        that makes the rest hold.
      </p>
      <p>
        <strong>Your data, with an honest report on it.</strong> A good program
        tells you where your data is not good enough to trust the output yet,
        and says so before the training rather than after. That is the same
        diagnosis an{" "}
        <Link href="/learn/what-is-an-ai-readiness-assessment" className={link}>
          AI readiness assessment
        </Link>{" "}
        produces, and if a training vendor cannot give you one, they are going
        to teach your team to trust a system that is not ready.
      </p>
      <p>
        <strong>A named owner afterwards.</strong> Somebody on your side has to
        own what happens next. Without one, the program is an event. With one,
        it is the start of a list of things to automate, and the next thing you
        buy is a build rather than another course.
      </p>

      <h2 className={h2}>What AI training for employees costs</h2>
      <p>
        The market spans four orders of magnitude, which is why the question is
        hard to answer honestly.
      </p>
      <p>
        At the free end are the vendor literacy courses: Google, Microsoft and
        the model providers all publish them, and they are genuinely worth the
        afternoon for baseline literacy. Subscription platforms sit in the tens
        of dollars per user per month. Custom corporate programs, delivered on
        your processes with your data, price per engagement rather than per
        seat, and that is where the five-figure quotes live.
      </p>
      <p>
        Our {TRAINING.name} is {TRAINING.price}. It sits beside the ladder
        rather than on it, which means you can buy it without buying anything
        else, and it is a working program that teaches your team to use the AI
        tools you already pay for, on your own processes and your own data.
        Every price we charge is published, including this one, on the{" "}
        <Link href="/ai-automation-services" className={link}>
          services and pricing page
        </Link>
        .
      </p>
      <p>
        The comparison worth making is not free versus paid. It is generic
        versus yours. A free literacy course and a {TRAINING.price} program are
        not competing for the same job. The first one teaches your team what
        the tools are. The second one teaches your team to run your work with
        them, and it only pays off if the work underneath is in a state worth
        automating. Which is the honest reason to run the diagnosis first.
      </p>

      <h2 className={h2}>How to evaluate a proposal in ten minutes</h2>
      <p>Ask the vendor these four questions and listen for hedging.</p>
      <ol className="list-decimal pl-6 space-y-3">
        <li>
          <strong>Which of our tools will you train on, by name?</strong> A
          program that cannot answer before the kickoff call has a fixed
          curriculum.
        </li>
        <li>
          <strong>What do you need from us before the first session?</strong>{" "}
          The right answer involves your processes and access to your systems.
          &ldquo;Nothing&rdquo; means generic.
        </li>
        <li>
          <strong>What happens if our data is not clean enough?</strong> The
          right answer is that they will tell you, and that some of the
          training changes as a result. &ldquo;That is not our scope&rdquo; is
          an honest answer too, and it tells you to run the diagnosis yourself
          first.
        </li>
        <li>
          <strong>Who owns this on our side when you leave?</strong> If they
          have not asked you that, they are not planning for anything to
          persist.
        </li>
      </ol>

      <h2 className={h2}>The short version</h2>
      <p>
        Your people are already using AI. Very few of them have been shown how
        to use it on your work. Train them on the tools, on your processes, with
        your data, and give the result an owner. Develop the judgement the slow
        way, through the work, because nobody sells that in a day and anyone
        who says they do is selling something else.
      </p>
    </>
  );
}
