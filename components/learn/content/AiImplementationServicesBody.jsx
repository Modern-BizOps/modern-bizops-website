import Link from "next/link";
import StatCards from "@/components/learn/StatCards";
import ComparisonTable from "@/components/learn/ComparisonTable";
import {
  LADDER,
  TRAINING,
  AUDIT_TERMS,
  CARE_PLAN,
  UPLIFT_RULE,
  CLEANUP_PRICE_FLOOR,
  CLEANUP_PRICE_CEILING,
} from "@/lib/offers";

const h2 = "font-display font-semibold text-navy text-2xl mt-10 mb-3";
const link = "text-navy underline";

const rung = Object.fromEntries(LADDER.map((r) => [r.id, r]));

// Primary sources the draft cites with [link: ...] markers, resolved at
// publish time on 2026-09-21. Microsoft's Cloud Adoption Framework AI strategy
// page fetched live (its first step is "Start with business problems", and it
// asks you to confirm the required data exists before choosing a solution).
// Gartner's Peer Insights market page for the category is confirmed by its
// indexed title ("Best Generative AI Consulting and Implementation Services
// Reviews 2026"); Gartner answers scripted fetches with 403, so a bot check on
// this link will not return 200 even though a browser does.
const GARTNER_URL =
  "https://www.gartner.com/reviews/market/generative-ai-consulting-and-implementation-services";
const MICROSOFT_URL =
  "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai/strategy";

// Verbatim transcription of the approved SEO loop cycle 3 asset 9 source copy
// (Marketing Systems/SEO Pilot/pending-approval/aeo-9-ai-implementation-
// services.md, drafted 2026-09-14, approved by Bradley and published
// 2026-09-21). Every price interpolates from lib/offers.js, so the audit credit
// renders as AUDIT_TERMS words ("100 percent", "your first Partner month") and
// Partner Plus carries its full ladder name, where the draft abbreviated both
// (aeo-1 and batch 2 precedent: the repo constant wins). The draft's one
// needs-Bradley flag, in "What it costs, by scope", ships qualitative per the
// handoff recommendation: the flag text is removed and no enterprise number is
// published. This body carries the author's first person (the Contactually
// and COO-seat stories), so it sits in AUTHORED_SPEAKS_AS_I.
export default function AiImplementationServicesBody() {
  return (
    <>
      <p>
        AI implementation services are the work of getting AI into the systems
        your business already runs on and into the hands of the people who have
        to use it. That means five things: preparing the data, connecting the
        systems, building the workflow, training the team who will own it, and
        keeping it running after the first month. Strategy is a separate job.
        Implementation is what happens after somebody decides what to build.
      </p>
      <p>
        The distinction matters because of where the money goes. Most of what
        you find when you start looking is built for enterprises. The names that
        come up first are Accenture, Deloitte, IBM Consulting, Slalom, BCG and
        The Hackett Group, and their engagements are scoped, staffed and priced
        for companies far larger than yours. Gartner maintains a whole review
        category for it (
        <a
          href={GARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          Gartner, Generative AI Consulting and Implementation Services
        </a>
        ). None of that is wrong. It is just not shaped for a company doing $1M
        to $50M with one person who would own the automation and no team to
        hand it to.
      </p>
      <p>
        This page covers what the work actually includes, what it costs at each
        scope, the part almost every quote skips, and our own published prices.
      </p>

      <h2 className={h2}>
        The five parts of an implementation, and which one gets skipped
      </h2>
      <p>
        <strong>Data preparation.</strong> Getting the records the AI will read
        into a state where reading them produces a right answer. Duplicates
        merged, required fields enforced, a shared definition for every number
        a report shows.
      </p>
      <p>
        <strong>Integration.</strong> Connecting the systems that are supposed
        to talk and currently do not. Forms, billing, calendar, CRM. If your
        conversion tracking cannot be trusted end to end, no automation built on
        top of it can be either.
      </p>
      <p>
        <strong>Workflow build.</strong> The visible part. Lead routing,
        follow-up sequences, research and enrichment, reporting, handoffs.
      </p>
      <p>
        <strong>Adoption.</strong> Training the people who will use it, and
        naming the person who owns it when it breaks.
      </p>
      <p>
        <strong>Upkeep.</strong> The month-four question. Systems drift, vendors
        change APIs, people leave.
      </p>
      <p>
        The skipped one is almost always the first. It is unglamorous, it is
        hard to scope from the outside, and it does not demo well. It is also
        the one that decides whether the rest holds. In the Modern BizOps GTM
        Maturity Framework, a method I built for measuring the go-to-market
        competencies inside a business, this shows up as a data quality problem
        long before it shows up as an AI problem. You can read the underlying
        idea at{" "}
        <Link href="/learn/data-quality-management" className={link}>
          data quality management
        </Link>
        .
      </p>
      <p>
        Here is the version of that lesson I learned before AI was the reason
        for it. At Contactually, a CRM company selling to realtors, I ran
        customer onboarding for about 100 new small-business accounts a month.
        The product worked. What decided whether a customer was still there in
        ninety days was not the software. It was whether their data went in
        clean and whether one person on their side owned the thing. Rebuilding
        onboarding around those two facts cut first-90-day churn in half and
        saved roughly $1M in revenue over six quarters. The technology had not
        changed at all.
      </p>
      <p>
        Later, as COO of a digital marketing agency, I was on the other side of
        it: the person who had to implement business information systems and
        automation inside a nine-person cross-functional team running fourteen
        service lines. A system nobody adopts is not a partial win. It is a line
        item and a grudge.
      </p>

      <h2 className={h2}>What it costs, by scope</h2>
      <p>
        Prices in this market vary more than they should, because
        &ldquo;implementation&rdquo; covers everything from a single automation
        to a multi-year enterprise program. The useful move is to price by scope
        rather than by vendor.
      </p>
      <p>
        <strong>A paid diagnostic.</strong> A fixed-fee assessment that looks at
        your actual stack and tells you what to build and what not to. Often
        credited toward the work that follows. A provider willing to be paid to
        tell you not to build something is worth more than one who starts
        building on day one.
      </p>
      <p>
        <strong>Foundation work.</strong> The cleanup above, priced as named
        items before anything goes on top of it.
      </p>
      <p>
        <strong>A single system.</strong> One named automation, scoped, built,
        documented and handed over.
      </p>
      <p>
        <strong>An ongoing seat.</strong> A monthly arrangement. Always ask
        whether the month buys named deliverables or buys access, because those
        are different products at similar prices.
      </p>
      <p>
        <strong>Enterprise programs.</strong> Multi-quarter transformation work
        from the firms named above. Different buyer, different budget, different
        problem.
      </p>

      <h2 className={h2}>Six questions that sort providers quickly</h2>
      <ol className="list-decimal pl-6 space-y-3">
        <li>
          <strong>
            What exists when you are done, and who on my side owns it?
          </strong>{" "}
          No named deliverable and no named owner means you are buying hours.
        </li>
        <li>
          <strong>What has to be true about my data before this works?</strong>{" "}
          &ldquo;Nothing, we handle everything&rdquo; means they have not
          looked.
        </li>
        <li>
          <strong>Do you price the foundation work separately?</strong> A
          blended number hides whether it is in there at all.
        </li>
        <li>
          <strong>What happens in month four?</strong> Listen for a number and a
          process.
        </li>
        <li>
          <strong>Is this built on tools I already pay for?</strong> Every extra
          platform is another thing to own.
        </li>
        <li>
          <strong>What are your prices?</strong> A provider who will not publish
          them is telling you the number depends on what they think you can
          pay.
        </li>
      </ol>
      <p>
        If you are not sure which of those your business would fail on, the free
        AI Revenue Scan will tell you in about five minutes:{" "}
        <Link href="/scorecard" className={link}>
          take the scan
        </Link>
        .
      </p>

      <h2 className={h2}>Strategy, implementation, and the seat in between</h2>
      <p>
        Most of the confusion in this category comes from three different jobs
        sold under one heading. Strategy work identifies use cases and builds a
        roadmap, and it is honestly priced by the hour or as a fixed-fee
        roadmap, because advice is open-ended. Implementation work ships named
        systems, and it is honestly priced per system, because the deliverable
        can be named before the work starts. The ongoing seat is a contract
        resource inside your team, and it should be compared against a hire
        rather than against a project.
      </p>

      {/* The draft note's comparison graphic: strategy work vs implementation
          work vs the ongoing seat. Every cell is condensed from the paragraph
          above, except the seat's last cell, which is the "ongoing seat"
          paragraph in "What it costs, by scope". No column is highlighted:
          the page's point is that each job has its own honest price, not that
          one of them wins. */}
      <ComparisonTable
        label="Side by side"
        title="Three different jobs sold under one heading"
        options={["Strategy work", "Implementation work", "The ongoing seat"]}
        rows={[
          {
            label: "What it is",
            cells: [
              "Identifies use cases and builds a roadmap.",
              "Ships named systems.",
              "A contract resource inside your team.",
            ],
          },
          {
            label: "Honestly priced",
            cells: [
              "By the hour or as a fixed-fee roadmap.",
              "Per system.",
              "As a monthly arrangement, compared against a hire rather than against a project.",
            ],
          },
          {
            label: "Why, or what to ask",
            cells: [
              "Because advice is open-ended.",
              "Because the deliverable can be named before the work starts.",
              "Whether the month buys named deliverables or buys access.",
            ],
          },
        ]}
      />

      <p>
        Paying one job&rsquo;s rate for a different job&rsquo;s work is the most
        common expensive mistake in this market. Microsoft&rsquo;s own adoption
        guidance makes the same sequencing point from the platform side, which
        is to start with the business problem and the data before choosing
        anything (
        <a
          href={MICROSOFT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={link}
        >
          Microsoft, Cloud Adoption Framework, AI strategy guidance
        </a>
        ).
      </p>
      <p>
        We have written the two comparisons buyers ask for most:{" "}
        <Link href="/learn/ai-consultant-vs-ai-agency" className={link}>
          AI consultant vs. AI automation agency
        </Link>{" "}
        and{" "}
        <Link href="/learn/ai-consultant-vs-in-house" className={link}>
          AI consultant vs. in-house
        </Link>
        . For what the market charges, see{" "}
        <Link href="/learn/ai-consultant-cost" className={link}>
          how much an AI consultant costs
        </Link>
        .
      </p>

      <h2 className={h2}>Our prices, published</h2>
      <p>
        We implement AI automation for B2B go-to-market teams at published
        prices, foundation first:
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>{rung.scan.name}:</strong> free. A self-serve readiness read,
          about five minutes.
        </li>
        <li>
          <strong>
            {rung.audit.name}: {rung.audit.price}.
          </strong>{" "}
          Connects to your actual stack, computes a maturity heat map, and hands
          you a prioritized automation map with fixed prices attached.{" "}
          {AUDIT_TERMS.creditPercent} of the fee credits toward{" "}
          {AUDIT_TERMS.creditTarget} within {AUDIT_TERMS.creditWindow}, and it
          carries a findings guarantee.
        </li>
        <li>
          <strong>
            Cleanup Services: {CLEANUP_PRICE_FLOOR} to {CLEANUP_PRICE_CEILING}{" "}
            fixed per item.
          </strong>{" "}
          The foundation work most quotes skip, done before builds go on top.
        </li>
        <li>
          <strong>
            {rung.builds.name}: {rung.builds.price} per named system.
          </strong>{" "}
          Fixed price, named scope, a runbook, and your team trained to own it.
          A second system of record adds {UPLIFT_RULE.addition}, capped at{" "}
          {UPLIFT_RULE.cap}.
        </li>
        <li>
          <strong>
            {CARE_PLAN.name}: {CARE_PLAN.price}.
          </strong>{" "}
          Optional, and this is the month-four answer.
        </li>
        <li>
          <strong>
            {rung.partner.name}: {rung.partner.price}.{" "}
            {rung["partner-plus"].name}: {rung["partner-plus"].price}.
          </strong>
        </li>
        <li>
          <strong>
            {TRAINING.name}: {TRAINING.price}.
          </strong>
        </li>
      </ul>

      {/* The draft note's benchmark stat cards: the audit, credited forward,
          and the per-named-system build band. Both descriptions are the
          price-list bullets directly above, condensed, and both prices
          interpolate from lib/offers.js. */}
      <StatCards
        label="Our published prices"
        title="The diagnostic first, then one named system at a time"
        stats={[
          {
            big: rung.audit.price,
            desc: `for the ${rung.audit.name}. It connects to your actual stack and hands you a prioritized automation map with fixed prices attached. ${AUDIT_TERMS.creditPercent} of the fee credits toward ${AUDIT_TERMS.creditTarget} within ${AUDIT_TERMS.creditWindow}.`,
            source: `${rung.audit.name}, published price`,
          },
          {
            big: rung.builds.price,
            desc: "per named system. Fixed price, named scope, a runbook, and your team trained to own it.",
            source: `${rung.builds.name}, published price`,
          },
        ]}
      />
    </>
  );
}
