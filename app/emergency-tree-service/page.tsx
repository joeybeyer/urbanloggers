import type { Metadata } from 'next'
import Link from 'next/link'
import { ExtLink } from '@/components/ui/ExtLink'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Emergency Tree Service Milwaukee, WI | Urban Loggers LLC',
  'Fallen tree on your home or storm damage in Milwaukee? Urban Loggers LLC responds 24/7 for emergency tree removal. Call (414) 240-4626.',
  '/emergency-tree-service/'
)

export default function EmergencyTreeServicePage() {
  const service = getServiceBySlug('emergency-tree-service')!

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.name, service.shortDesc, 'https://urbanloggers.org/emergency-tree-service/', '24/7 Emergency Tree Removal', '$$-$$$')
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }}
      />


      {/* Emergency hero — phone CTA above fold */}
      <section className="relative text-white py-14 px-4 min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/emergency.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🚨</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            24/7 Emergency Tree Service in Milwaukee
          </h1>
          <p className="text-xl text-red-100 mb-8">
            <strong>Fallen tree on your home or a hazardous limb over your driveway?</strong> Urban
            Loggers answers emergency calls around the clock across Greater Milwaukee.
          </p>
          <PhoneButton size="lg" label="Call (414) 240-4626" className="bg-white !text-red-700 hover:bg-red-50" />
          <p className="mt-4 text-red-200 text-sm">Available 24 hours, 7 days a week</p>
        </div>
      </section>

      {/* Quick reference table — BERT optimization */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Emergency Tree Service — At a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-red-700 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Availability', '24/7 — 365 days a year'],
                  ['Response Time', '2–4 hours for urgent situations'],
                  ['Service Area', 'Greater Milwaukee, WI'],
                  ['Insurance Docs', 'Yes — we provide for your claim'],
                  ['Power Line Trees', 'We coordinate with We Energies'],
                  ['Phone', '(414) 240-4626'],
                ].map(([label, value]) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal">{label}</td>
                    <td className="px-4 py-3 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose-brand">
          <p>
            <strong>
              Short answer: if a tree is on your house, a vehicle, or near a power line, get
              everyone clear, call 911 for fire, injury, or downed lines, and then call us.
            </strong>{' '}
            We respond around the clock, prioritize calls where a tree is on a structure or
            blocking access, and aim to be on site within two to four hours depending on storm
            volume.
          </p>
          <h2>What We Handle in an Emergency</h2>
          <p>{service.longDesc}</p>
          <ul>
            <li>Trees fallen on homes, garages, or vehicles</li>
            <li>Hazardous hanging limbs (widow-makers)</li>
            <li>Storm-damaged trees blocking roads or driveways</li>
            <li>Trees contacting power or utility lines (we coordinate with utilities)</li>
            <li>Root failures in saturated soil after heavy rain</li>
          </ul>
          <h2>First Steps When a Tree Comes Down</h2>
          <p>
            The first minutes decide whether a bad day stays a property problem or becomes an
            injury. Work through these in order.
          </p>
          <ul>
            <li>Get everyone out of the room or area under the tree, and keep pets away</li>
            <li>Call 911 if anyone is hurt, if you smell gas, or if there is fire or smoke</li>
            <li>Stay far back from any wire on the ground or tangled in the tree</li>
            <li>Take photos from a safe distance before anything is moved</li>
            <li>Shut off water if a pipe or the roof is open to weather, only if you can do it safely</li>
            <li>Call us with your address, what the tree is touching, and what it is blocking</li>
          </ul>
          <p>
            Do not climb onto a damaged roof, and do not cut a tree that is under tension. A
            trunk bent over a fence, a house, or another tree can spring when it is cut. That is
            how homeowners with chainsaws get hurt, and it is the reason{' '}
            <ExtLink href="https://www.osha.gov/">OSHA</ExtLink> treats storm cleanup as
            hazardous work for trained crews.
          </p>

          <h2>Trees and Power Lines</h2>
          <p>
            Treat every wire on the ground as live, even if the lights are out on your street, and
            never touch a tree that is touching a line. Power can return without warning. Report
            downed lines and outages to{' '}
            <ExtLink href="https://www.we-energies.com/">We Energies</ExtLink> and call 911 if the
            situation is dangerous. Only the utility can make its own lines safe. Once the lines
            are de-energized or cleared, we can work around them and remove the tree. Our crew
            coordinates with the utility rather than guessing, and we will not start cutting until
            the area is confirmed safe.
          </p>

          <h2>What Happens After You Call</h2>
          <p>
            We ask where the tree is, what it is resting on, and whether anyone is in danger.
            Calls where a tree is on a structure, blocking a driveway or road, or hanging over
            something occupied go first. When the crew arrives we look at how the weight is
            loaded, decide the order of cuts, and then bring the tree down in sections so it does
            not shift onto the building any further. The work is done in stages: make it safe,
            take the tree off the structure, and clear the debris.
          </p>
          <p>
            Large trunks are often cut into manageable lengths and removed, and sound hardwood
            can sometimes go to our portable mill rather than the chipper. See{' '}
            <Link href="/log-milling/">log milling</Link> if you would like to keep wood from a
            storm tree. Stumps left behind can be handled afterward through{' '}
            <Link href="/stump-grinding/">stump grinding</Link>.
          </p>

          <h2>Storm Season in Southeast Wisconsin</h2>
          <p>
            Milwaukee-area trees take their worst hits from summer thunderstorms with straight-line
            wind, from heavy wet snow and ice in late fall and spring, and from saturated ground
            that lets roots give way. The{' '}
            <ExtLink href="https://www.weather.gov/mkx/">National Weather Service in Milwaukee</ExtLink>{' '}
            issues the watches and warnings for our area, and it is worth checking before you go
            outside after a storm, since a second line of storms can follow the first.
          </p>
          <p>
            Some failures can be seen coming. Large dead limbs, cracks in the trunk, mushrooms
            at the base, and a lean that has changed are all reasons to have a tree looked at
            before the next storm. The{' '}
            <ExtLink href="https://www.treesaregood.org/">Trees Are Good</ExtLink> site explains
            warning signs in plain language, and the{' '}
            <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>{' '}
            is the professional body behind it. A tree that is leaning but stable is a scheduled
            job rather than an emergency, and we will say so.
          </p>

          <h2>Insurance Documentation</h2>
          <p>
            We provide itemized invoices and before/after documentation to support your homeowner&rsquo;s
            insurance claim. Many policies cover removal when a tree strikes a structure, but
            coverage varies, so read your policy and call your agent early. Photos taken before
            cleanup begin, the date and time of the storm, and a list of what was damaged all make
            the claim easier. For larger storms, the{' '}
            <ExtLink href="https://wem.wi.gov/">Wisconsin Emergency Management</ExtLink> site lists
            state response information, and{' '}
            <ExtLink href="https://www.fema.gov/">FEMA</ExtLink> explains federal disaster
            assistance when an area is declared. Neither replaces a conversation with your insurer.
          </p>

          <h2>Cleanup and Prevention</h2>
          <p>
            After the tree is off the structure, the remaining limbs, brush, and trunk sections
            still have to go somewhere. Keep the debris pile away from the house and out of the
            street until it is removed. Cleanup after a storm is also a good time to look at the
            rest of the yard. Trees with storm damage often have torn limbs or cracked unions that
            should be pruned out properly. Guidance from{' '}
            <ExtLink href="https://extension.wisc.edu/">UW Extension</ExtLink> covers how to care
            for a damaged tree and when it is better to remove it. For a planned job, see{' '}
            <Link href="/tree-removal/">tree removal</Link> and{' '}
            <Link href="/tree-trimming-pruning/">tree trimming and pruning</Link>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-red-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Need a Tree Off Your Property Fast?</h2>
          <p className="text-red-100 mb-6">
            A damaged tree resting on a roof can cause more damage the longer it sits. Phone
            Urban Loggers LLC any hour and tell us what the tree is touching.
          </p>
          <PhoneButton size="lg" label="Call (414) 240-4626" className="bg-white !text-red-700 hover:bg-red-50" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Related services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">Milwaukee Service Area</Link>
          </div>
        </div>
      </nav>
    </>
  )
}
