/**
 * GPL Website Database Seed
 *
 * This file contains seed data for the GPL website.
 * Run with: bun run db:seed
 */
import { db } from './index'
import {
  faqs,
  news,
  emergencyContacts,
} from './schema'

async function seed() {
  console.log('🌱 Starting database seed...')

  try {
    // ============================================
    // EMERGENCY CONTACTS
    // ============================================
    console.log('📞 Seeding emergency contacts...')

    await db.insert(emergencyContacts).values([
      {
        region: 'Demerara',
        name: 'Demerara Emergency Hotline',
        primaryNumber: '0475',
        secondaryNumber: '226-2600',
        description: '24/7 Power Emergency - Downed lines, outages, electrical hazards',
        available: '24/7',
        order: 1,
        isActive: true,
      },
      {
        region: 'Berbice',
        name: 'Berbice Emergency Hotline',
        primaryNumber: '333-2186',
        secondaryNumber: '333-2187',
        description: '24/7 Power Emergency - New Amsterdam and East Berbice',
        available: '24/7',
        order: 2,
        isActive: true,
      },
      {
        region: 'Essequibo',
        name: 'Essequibo Emergency Hotline',
        primaryNumber: '771-4244',
        secondaryNumber: null,
        description: '24/7 Power Emergency - Essequibo Coast and Islands',
        available: '24/7',
        order: 3,
        isActive: true,
      },
      {
        region: 'Linden',
        name: 'Linden Emergency Hotline',
        primaryNumber: '444-6231',
        secondaryNumber: null,
        description: '24/7 Power Emergency - Linden and Upper Demerara',
        available: '24/7',
        order: 4,
        isActive: true,
      },
      {
        region: 'Head Office',
        name: 'GPL Head Office',
        primaryNumber: '227-4910',
        secondaryNumber: '225-3203',
        description: 'Main Administration - Business hours only',
        available: 'Mon-Fri 8:00 AM - 4:30 PM',
        order: 5,
        isActive: true,
      },
    ]).onConflictDoNothing()

    // ============================================
    // FAQs
    // ============================================
    console.log('❓ Seeding FAQs...')

    const faqData = [
      // Billing FAQs
      {
        category: 'billing' as const,
        question: 'How do I pay my electricity bill?',
        answer: 'You can pay your GPL electricity bill through several convenient methods:\n\n1. **Online Payment**: Use our website or mobile app with credit/debit cards\n2. **Banks**: Pay at Republic Bank, Citizens Bank, or GBTI branches\n3. **Mobile Money**: Use Mobile Money Guyana (MMG)\n4. **GPL Offices**: Visit any GPL customer service center\n5. **Authorized Agents**: Pay at participating pharmacies and supermarkets\n\nAlways keep your receipt as proof of payment.',
        order: 1,
      },
      {
        category: 'billing' as const,
        question: 'Why is my electricity bill so high?',
        answer: 'High electricity bills can result from several factors:\n\n1. **Increased usage**: More appliances or longer usage times\n2. **Inefficient appliances**: Old refrigerators, ACs, or water heaters consume more power\n3. **Faulty meter**: Request a meter test if you suspect issues\n4. **Leakage**: Electrical leakage from poor wiring\n5. **Estimated readings**: Bills based on estimates rather than actual readings\n\nYou can request a bill audit by calling our customer service line.',
        order: 2,
      },
      {
        category: 'billing' as const,
        question: 'How do I read my electricity meter?',
        answer: 'To read your electricity meter:\n\n**Digital Meters**: Simply read the numbers displayed on the screen from left to right.\n\n**Dial Meters**: Read each dial from left to right, noting the number the pointer has just passed. If the pointer is directly on a number, check the dial to its right – if that pointer hasn\'t passed zero, read the lower number.\n\nRecord your reading monthly to track consumption and verify your bills.',
        order: 3,
      },
      {
        category: 'billing' as const,
        question: 'What is the current electricity rate?',
        answer: 'GPL electricity rates are regulated by the Public Utilities Commission (PUC). Current rates:\n\n- **Residential**: GYD 35.63 per kWh (first 75 kWh), GYD 48.15 per kWh (over 75 kWh)\n- **Commercial**: GYD 52.00 per kWh\n- **Industrial**: Varies by consumption level\n\n*Rates are subject to fuel surcharge adjustments. Contact customer service for current exact rates.*',
        order: 4,
      },

      // Connections FAQs
      {
        category: 'connections' as const,
        question: 'How do I apply for a new electricity connection?',
        answer: 'To apply for a new electricity connection:\n\n1. **Visit GPL office** with required documents:\n   - Valid ID (national ID or passport)\n   - Proof of property ownership or tenancy agreement\n   - Approved building plan (for new construction)\n   - Completed application form\n\n2. **Pay the connection fee** (varies by service type)\n3. **Schedule inspection** - GPL will inspect your premises\n4. **Receive connection** - Usually within 7-14 working days after approval\n\nYou can also start your application online through our website.',
        order: 1,
      },
      {
        category: 'connections' as const,
        question: 'How long does a new connection take?',
        answer: 'Connection timelines:\n\n- **Standard residential**: 7-14 working days after approval\n- **Commercial/Industrial**: 14-30 working days depending on capacity requirements\n- **Temporary connections**: 5-7 working days\n\nDelays may occur if:\n- Infrastructure upgrades are needed\n- Documentation is incomplete\n- Electrical installation fails inspection\n\nYou can track your application status online or call customer service.',
        order: 2,
      },
      {
        category: 'connections' as const,
        question: 'What documents do I need for a service upgrade?',
        answer: 'For a service upgrade (higher amperage), you need:\n\n1. **Completed application form**\n2. **Current electricity bill** (showing account number)\n3. **Valid ID** of the account holder\n4. **Reason for upgrade** (new appliances, business expansion, etc.)\n5. **Electrical installation certificate** from a licensed electrician (if internal wiring changes are needed)\n\nUpgrade fees depend on the new service capacity required.',
        order: 3,
      },

      // Outages FAQs
      {
        category: 'outages' as const,
        question: 'What should I do during a power outage?',
        answer: 'During a power outage:\n\n1. **Check if it\'s just your home** - Check if neighbors have power\n2. **Report the outage** - Call the emergency hotline for your region\n3. **Unplug sensitive equipment** - Computers, TVs, and appliances to protect from power surge when supply returns\n4. **Keep refrigerator/freezer closed** - Food stays cold for hours if unopened\n5. **Use flashlights, not candles** - Reduce fire risk\n6. **Stay away from downed power lines** - Assume all lines are live and dangerous\n\n**Emergency Numbers:**\n- Demerara: 0475\n- Berbice: 333-2186\n- Essequibo: 771-4244',
        order: 1,
      },
      {
        category: 'outages' as const,
        question: 'How do I report a power outage?',
        answer: 'Report outages through these channels:\n\n**By Phone (24/7):**\n- Demerara: 0475 or 226-2600\n- Berbice: 333-2186\n- Essequibo: 771-4244\n\n**Online:**\n- Website: www.gplinc.com (Report Outage form)\n- Email: customerservice@gplinc.com\n\n**When reporting, please provide:**\n- Your account number (if available)\n- Exact address\n- Description of the problem\n- Whether you see any hazards (downed lines, sparks)',
        order: 2,
      },
      {
        category: 'outages' as const,
        question: 'Will I be compensated for outage-related damages?',
        answer: 'GPL follows PUC guidelines on outage compensation:\n\n- **Planned outages** with proper notice do not qualify for compensation\n- **Extended unplanned outages** (over 24 hours) may qualify for billing adjustments\n- **Surge damage** to appliances requires documented proof and may be evaluated case-by-case\n\nTo file a claim:\n1. Document the damage with photos\n2. Get repair estimates or receipts\n3. Submit a written claim to GPL Customer Service\n4. Allow 14-30 days for review\n\n*Note: Claims are evaluated individually and not automatically approved.*',
        order: 3,
      },

      // Safety FAQs
      {
        category: 'safety' as const,
        question: 'What should I do if I see a downed power line?',
        answer: '⚠️ **CRITICAL SAFETY WARNING** ⚠️\n\nIf you see a downed power line:\n\n1. **STAY AWAY** - Keep at least 10 meters (33 feet) distance\n2. **ASSUME IT\'S LIVE** - Even if it appears dead, it may be energized\n3. **CALL IMMEDIATELY** - Dial 0475 (Demerara) or your regional emergency number\n4. **WARN OTHERS** - Keep people and animals away from the area\n5. **DON\'T TOUCH** - Never touch the line, anything touching it, or anyone in contact with it\n6. **DON\'T DRIVE OVER IT** - Lines can become entangled in vehicles\n\n**If someone is in contact with a power line:** Do NOT touch them. Call emergency services immediately.',
        order: 1,
      },
      {
        category: 'safety' as const,
        question: 'How can I reduce the risk of electrical fires at home?',
        answer: 'Prevent electrical fires by:\n\n1. **Don\'t overload outlets** - One high-wattage appliance per outlet\n2. **Replace damaged cords** - Frayed or cracked cords are fire hazards\n3. **Use proper wattage bulbs** - Check fixture ratings\n4. **Install surge protectors** - Protect sensitive electronics\n5. **Keep flammables away from heat** - Curtains, papers away from lamps\n6. **Hire licensed electricians** - For all electrical work\n7. **Check for warning signs**:\n   - Frequently tripped breakers\n   - Buzzing or sizzling sounds\n   - Warm or discolored outlets\n   - Burning smell\n\nIf you notice any warning signs, call a licensed electrician immediately.',
        order: 2,
      },
      {
        category: 'safety' as const,
        question: 'Is it safe to use generators during outages?',
        answer: 'Generator safety is critical:\n\n**DO:**\n- Use outdoors only, at least 20 feet from windows/doors\n- Use heavy-duty outdoor extension cords\n- Turn off generator before refueling\n- Let it cool before adding fuel\n- Install a transfer switch for whole-house connection\n\n**DON\'T:**\n- ❌ Run indoors or in enclosed spaces (carbon monoxide risk)\n- ❌ Connect directly to home wiring without transfer switch\n- ❌ Overload the generator\n- ❌ Refuel while hot or running\n- ❌ Store fuel near the running generator\n\n**Carbon monoxide from generators can kill in minutes. Always use outdoors with proper ventilation.**',
        order: 3,
      },

      // Customer Service FAQs
      {
        category: 'customer_service' as const,
        question: 'What are GPL customer service hours?',
        answer: 'GPL Customer Service Hours:\n\n**Main Customer Service Centers:**\n- Monday to Friday: 8:00 AM - 4:30 PM\n- Saturday: 8:00 AM - 12:00 PM\n- Sunday & Holidays: Closed (emergency lines available 24/7)\n\n**Emergency Hotlines (24/7):**\n- Demerara: 0475\n- Berbice: 333-2186\n- Essequibo: 771-4244\n\n**Online Services:** Available 24/7 at www.gplinc.com\n\n**Email:** customerservice@gplinc.com (responses within 2 business days)',
        order: 1,
      },
      {
        category: 'customer_service' as const,
        question: 'How do I file a complaint?',
        answer: 'To file a complaint with GPL:\n\n1. **Online**: Submit through our website contact form\n2. **Email**: customerservice@gplinc.com\n3. **Phone**: 227-4910 or regional office numbers\n4. **In Person**: Visit any GPL customer service center\n5. **Letter**: Write to Customer Service Manager, GPL, 40 Main Street, Georgetown\n\n**Include in your complaint:**\n- Account number\n- Contact information\n- Detailed description of the issue\n- Any supporting documentation\n\nYou should receive acknowledgment within 3 business days and resolution within 14 business days for standard complaints.',
        order: 2,
      },

      // Streetlights FAQs
      {
        category: 'streetlights' as const,
        question: 'How do I report a faulty streetlight?',
        answer: 'Report streetlight issues through:\n\n**Online**: Use our Streetlight Report form on the website\n\n**Phone**: Call your regional office during business hours\n- Georgetown area: 227-4910\n- Berbice: 333-2186\n- Essequibo: 771-4244\n\n**Information needed:**\n- Exact location (street name, nearby landmarks)\n- Pole number (if visible)\n- Type of problem (not working, flickering, stays on during day, damaged)\n\nRepairs are typically completed within 5-7 business days, depending on the issue and parts availability.',
        order: 1,
      },
      {
        category: 'streetlights' as const,
        question: 'Who is responsible for streetlight maintenance?',
        answer: 'Streetlight responsibility:\n\n**GPL maintains:**\n- Public streetlights on utility poles\n- The electrical connections and wiring\n- Replacement of bulbs and fixtures\n\n**Not GPL\'s responsibility:**\n- Private security lights on non-GPL poles\n- Decorative lighting installed by municipalities\n- Lights on private property\n\n**Municipal/NDC areas** may have shared responsibility agreements. Contact your local authority if unsure.\n\nTo request a new streetlight installation, contact your local neighborhood council, who will coordinate with GPL.',
        order: 2,
      },

      // Account FAQs
      {
        category: 'account' as const,
        question: 'How do I change the name on my account?',
        answer: 'To transfer account ownership:\n\n**Documents required:**\n- Completed transfer application form\n- Valid ID of new account holder\n- Property ownership document or lease agreement\n- Copy of last paid bill (or clearance of outstanding balance)\n- Death certificate (if transferring due to deceased)\n\n**Process:**\n1. Visit a GPL customer service center\n2. Submit required documents\n3. Pay any outstanding balance on the account\n4. Pay the transfer fee\n5. Receive confirmation (usually same-day)\n\n*Note: All outstanding balances must be cleared before transfer.*',
        order: 1,
      },
      {
        category: 'account' as const,
        question: 'How do I update my contact information?',
        answer: 'Update your contact details by:\n\n**Online:**\n1. Log in to your GPL account at www.gplinc.com\n2. Go to Account Settings\n3. Update your phone number, email, or mailing address\n4. Save changes\n\n**In Person:**\n- Visit any GPL customer service center with your ID and account number\n\n**By Phone:**\n- Call customer service at 227-4910\n- Verify your identity with security questions\n- Request the update\n\nKeep your contact information current to receive outage notifications and important account alerts.',
        order: 2,
      },

      // Emergency FAQs
      {
        category: 'emergency' as const,
        question: 'What qualifies as an electrical emergency?',
        answer: 'Call the emergency hotline (0475) for:\n\n**IMMEDIATE EMERGENCIES:**\n- Downed power lines\n- Electrical fires or smoke from outlets\n- Exposed wires or damaged equipment\n- Flooding near electrical equipment\n- Electric shock incidents\n- Sparks or burning smell from electrical equipment\n\n**URGENT (but not life-threatening):**\n- Complete power outage\n- Partial power (some outlets working, others not)\n- Voltage fluctuations damaging appliances\n- Meter sparking or making unusual sounds\n\n**For life-threatening emergencies, ALSO call 911 or emergency services.**',
        order: 1,
      },
      {
        category: 'emergency' as const,
        question: 'How do I prepare for hurricane season?',
        answer: 'Hurricane/storm electrical preparation:\n\n**Before the Storm:**\n- Unplug all non-essential appliances\n- Note your meter reading\n- Fully charge phones and battery backups\n- Test your generator (if you have one)\n- Know your regional emergency number\n- Fill containers with water (water pumps may lose power)\n\n**During the Storm:**\n- Stay indoors away from windows\n- Don\'t use electrical appliances if flooding occurs\n- Don\'t touch electrical equipment if wet\n\n**After the Storm:**\n- Report downed lines immediately (don\'t approach them)\n- Wait for GPL to restore power before reconnecting appliances\n- Have a licensed electrician check your system if water entered your home\n\n**GPL Storm Emergency: 0475**',
        order: 2,
      },
    ]

    for (const faq of faqData) {
      await db.insert(faqs).values({
        ...faq,
        isPublished: true,
      }).onConflictDoNothing()
    }

    // ============================================
    // NEWS
    // ============================================
    console.log('📰 Seeding news articles...')

    await db.insert(news).values([
      {
        title: 'GPL Announces New Online Payment Portal',
        slug: 'gpl-announces-new-online-payment-portal',
        excerpt: 'Pay your electricity bills faster and easier with our upgraded online payment system.',
        content: `# GPL Announces New Online Payment Portal

Guyana Power & Light Inc. is pleased to announce the launch of our upgraded online payment portal, making it easier than ever for customers to manage their electricity accounts.

## Key Features

- **Multiple Payment Methods**: Credit/debit cards, bank transfers, and Mobile Money
- **Instant Payment Confirmation**: Receive immediate confirmation of your payment
- **Payment History**: View all past transactions in one place
- **Auto-Pay Option**: Set up automatic monthly payments
- **Mobile-Friendly**: Pay on any device, anywhere

## How to Get Started

1. Visit www.gplinc.com
2. Click on "Pay Bill"
3. Enter your account number
4. Select your payment method
5. Complete the payment

For assistance, contact our customer service team at 227-4910.

We thank you for your continued support as we work to improve our services.`,
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Scheduled Maintenance: Georgetown Area - January 15',
        slug: 'scheduled-maintenance-georgetown-january-15',
        excerpt: 'Planned maintenance work will affect power supply in select Georgetown areas.',
        content: `# Scheduled Maintenance Notice

GPL will be conducting essential maintenance work on **January 15, 2026** that will affect electricity supply in the following areas:

## Affected Areas

- Kitty
- Campbellville
- Subryanville
- Bel Air Park

## Outage Schedule

- **Date**: January 15, 2026
- **Time**: 9:00 AM to 3:00 PM
- **Duration**: Approximately 6 hours

## Purpose

This maintenance is necessary to:
- Upgrade transformer capacity
- Replace aging infrastructure
- Improve service reliability

## Customer Advisory

- Please unplug sensitive electronic equipment
- Ensure backup for essential medical devices
- Store water for the outage period

We apologize for any inconvenience and thank you for your understanding.

For updates, call: 0475`,
        status: 'published',
        publishedAt: new Date(Date.now() - 86400000), // Yesterday
      },
      {
        title: 'Safety Alert: Rainy Season Precautions',
        slug: 'safety-alert-rainy-season-precautions',
        excerpt: 'Important safety tips for the rainy season to protect yourself and your family.',
        content: `# Rainy Season Electrical Safety Alert

As we enter the rainy season, GPL reminds all customers to take extra precautions around electrical equipment and installations.

## Key Safety Tips

### Outdoor Safety
- Stay away from power lines, especially during and after storms
- Report any downed lines immediately - DO NOT APPROACH
- Avoid standing in puddles near electrical equipment

### Home Safety
- Have a licensed electrician inspect your electrical system
- Install ground fault circuit interrupters (GFCIs) in wet areas
- Keep electrical appliances away from water
- Don't use extension cords in wet conditions

### Generator Safety
- NEVER run generators indoors
- Keep generators dry and covered
- Use proper transfer switches

## Emergency Numbers

If you see electrical hazards during the rainy season, call immediately:

- **Demerara**: 0475
- **Berbice**: 333-2186
- **Essequibo**: 771-4244

Stay safe this rainy season!`,
        status: 'published',
        publishedAt: new Date(Date.now() - 172800000), // 2 days ago
      },
    ]).onConflictDoNothing()

    console.log('✅ Database seed completed successfully!')

  } catch (error) {
    console.error('❌ Seed error:', error)
    throw error
  }
}

// Run seed if executed directly
seed()
  .then(() => {
    console.log('Seed finished. Exiting...')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
