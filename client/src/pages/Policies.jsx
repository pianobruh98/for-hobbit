import { LESSON_TIERS } from '../data/tuition.js';

function PolicySection({ title, children }) {
  return (
    <details className="accordion-item">
      <summary className="accordion-header">
        <span>{title}</span>
        <span className="icon" aria-hidden="true">+</span>
      </summary>
      <div className="accordion-content-wrapper">
        <div className="accordion-content">{children}</div>
      </div>
    </details>
  );
}

export default function Policies() {
  return (
    <>
      <header className="page-header site-container">
        <h1>Studio Policies</h1>
        <p>
          This is how I do things! I'll have you sign a copy that states you read and agree to all of this
          when the trial period is over. Policies are to make sure you guys know what to expect out of me,
          and I know what to expect out of you.
        </p>
      </header>

      <main className="site-container">
        <div className="accordion-container">
          <PolicySection title="1. Tuition & Financial Policies">
            <p>I do tuition as a flat monthly rate that secures your family's spot on my schedule and driving path.</p>

            <strong className="content-heading">Fall/Winter Session Tiers (September – May)</strong>
            <ul className="policy-list">
              {LESSON_TIERS.map((tier) => (
                <li key={tier.minutes}>
                  <strong>
                    {tier.name} ({tier.minutes} Minutes):
                  </strong>{' '}
                  ${tier.rate} / month. {tier.description}
                </li>
              ))}
            </ul>

            <strong className="content-heading">Summer Session Tiers (June, July, and August)</strong>
            <p>People go places during the summer. I reduce tuition during the summer and do things a little differently:</p>
            <ul className="policy-list">
              {LESSON_TIERS.map((tier) => (
                <li key={tier.minutes}>
                  <strong>{tier.minutes}-Minute Summer Rate:</strong> ${tier.summerRate} / month
                </li>
              ))}
            </ul>
            <p>
              <strong>Summer Scheduling & Rollovers:</strong> You get 9 total lessons during the Summer. You can
              schedule these however is convenient for your family (for example, you could do one lesson in
              June, and have regular lessons for July and August.) If you decide to take a break completely
              during the summer, I can't guarantee your time slot, and depending on my waitlist, might not be
              able to continue teaching you in the Fall.
            </p>

            <strong className="content-heading">Payment Deadlines & Late Fees</strong>
            <ul className="policy-list">
              <li><strong>Methods:</strong> Payment is accepted via Zelle, Venmo, Cash, or personal check.</li>
              <li><strong>Due Date:</strong> Tuition is due in full on the 1st of each month.</li>
              <li><strong>Late Fees:</strong> Payments received after the 5th of the month will incur a $25 late fee.</li>
              <li>
                <strong>Suspension:</strong> If tuition and late fees are not received by the 10th of the month,
                lessons are paused, and your reserved time slot is released to my waiting list.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="2. Attendance & Cancellation Policy">
            <p>Because I come to your house, I have a limited capacity to reschedule at the drop of a hat.</p>
            <ul className="policy-list">
              <li>
                <strong>Student Absences:</strong> Missed or cancelled lessons by students for any reason
                (illness, sports, vacations) are forfeited and will not be refunded or made up. You can ask me
                to make an exception to come at a different time or to see if another family will swap spots
                with you, but it's not guaranteed.
              </li>
              <li>
                <strong>Teacher Cancellations:</strong> If I cancel a lesson due to illness, severe weather, or
                professional performance obligations, a direct prorated tuition credit for that lesson will be
                applied to your next monthly invoice.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Service Area & In-Home Requirements">
            <strong className="content-heading">Driving Boundaries</strong>
            <p>
              I teach families located within the following zip codes: [Insert Zip Codes]. If you live within
              the Salt Lake Valley but reside outside these specific boundaries, talk to me, and I can give you
              a quote for your location.
            </p>

            <strong className="content-heading">Home Environment Standards</strong>
            <p>Since your home is my lesson environment, there's a couple things that I need to be able to teach.</p>
            <ul className="policy-list">
              <li>
                <strong>The Instrument:</strong> Students must have access to an acoustic piano in good repair
                (reasonably in tune) or a digital keyboard featuring 88 fully-weighted keys. (Note: An acoustic
                piano is highly recommended, as it fundamentally alters a child's technical and tonal
                development. Excellent acoustic pianos can often be found entirely free on Facebook
                Marketplace—I'm happy to help you find a good one).
              </li>
              <li>
                <strong>Parental Presence:</strong> An adult parent or legal guardian must remain within
                earshot of the piano for the whole lesson.
              </li>
              <li>
                <strong>Distractions:</strong> I get that homes are chaotic and stuff is going on, and for some
                kids that isn't a problem. If I notice that a student is struggling to concentrate on the lesson
                because of distractions in the home, I'll have a conversation with you about what needs to
                happen so we can have a good lesson environment.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Performance, Festivals, & Competitions">
            <p>
              Performance is a vital pillar of classical training. It builds confidence, stage presence, and
              long-term goal orientation.
            </p>
            <ul className="policy-list">
              <li>
                <strong>Studio Recitals:</strong> I host three annual recitals: a Spring Recital (May), an
                optional Summer Recital (August), and a Winter Recital (December). The full yearly recital
                calendar is released to families at the end of January.
              </li>
              <li>
                <strong>Festivals & Competitions:</strong> All eligible students participate in the NFMC
                Federation Music Festival every March. Advanced students are actively prepared for and
                encouraged to enter local Salt Lake area piano competitions.
              </li>
              <li>
                <strong>Dress Code:</strong> Semi-formal, elegant attire is required for all recitals, festivals,
                and competitive evaluations.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Evaluation, Grading, & The Recital Shop">
            <p>I give students a preparation grade from 1 to 4 at the end of every lesson.</p>
            <ul className="policy-list">
              <li>
                <strong>Grade 4 (Perfect):</strong> Exceptionally prepared. Written theory assignment is
                complete; all repertoire pieces are passed off in two or fewer attempts with solid technique and
                artistic expression; weekly practice log is complete.
              </li>
              <li>
                <strong>Grade 3 (Well Prepared):</strong> Solid effort. Repertoire pieces are passed off in three
                or fewer attempts, but technical precision or artistic dynamics may need refinement. Theory
                assignments or practice logs may have minor missing entries.
              </li>
              <li>
                <strong>Grade 2 (Somewhat Prepared):</strong> Inconsistent effort. Repertoire requires four or
                more attempts to pass, theory assignments are incomplete, or key technical goals were ignored
                during home practice.
              </li>
              <li>
                <strong>Grade 1 (Unprepared):</strong> Student did not practice. Note: Even if a student manages
                to pass a piece based on natural ability, a total lack of weekly practice still automatically
                results in a Grade 1.
              </li>
            </ul>
            <p>
              <strong>Studio Standards & Dismissal:</strong> If a student consistently receives Grades 1 and 2
              due to a lack of effort or practice, I'll give out a warning. If things don't improve, I'll
              recommend a new teacher.
            </p>
            <p>
              <strong>Rewards:</strong> Every lesson ends with candy! A 4 grade means they get 4 pieces. If
              candy isn't your thing, talk to me and we can figure something else out. Additionally, students
              accumulate points based on their weekly grades to spend at a Prize Shop, held at the conclusion of
              our seasonal recitals.
            </p>
          </PolicySection>

          <PolicySection title="6. Studio Exit Policy">
            <p>
              If a family chooses to withdraw any students from the academy, the transition is handled via the
              following protocol:
            </p>
            <ul className="policy-list">
              <li>
                <strong>14-Day Notice:</strong> A minimum 14-day written notice is required to cancel
                enrollment. Families are financially responsible for any lessons falling within that 14-day
                window; no immediate refunds are provided for sudden cancellations.
              </li>
              <li>
                <strong>Re-enrollment:</strong> If a family withdraws a student and wishes to return to the
                academy at a later date, I'll do the best I can, but I can't guarantee their old time slot back.
              </li>
            </ul>
          </PolicySection>
        </div>
      </main>
    </>
  );
}
