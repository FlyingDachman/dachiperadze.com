const FORMSPREE_URL = "https://formspree.io/f/maeyzglo";

// Paste the real Stripe Payment Link URLs for the three fixed-price services below.
// Do not invent or reuse a link: create one Payment Link in Stripe for each exact price.
const STRIPE_LINKS = {
  contractReview: "PASTE_STRIPE_PAYMENT_LINK_FOR_300_EUR_HERE",
  agencyAgreement: "PASTE_STRIPE_PAYMENT_LINK_FOR_2000_EUR_HERE",
  consultation: "PASTE_STRIPE_PAYMENT_LINK_FOR_100_EUR_HERE",
  salaryTermination: "PASTE_STRIPE_PAYMENT_LINK_FOR_1000_EUR_HERE"
};

const serviceDetails = {
  'Contract Review': {
    type: 'FIXED FEE · €300',
    price: '€300',
    description: 'A defined-scope legal review of a playing, representation, transfer, loan or related football agreement. The service includes written practical conclusions on the provisions that matter most.',
    subject: 'Contract Review'
  },
  'Contract Drafting & Negotiation': {
    type: 'ASSESSMENT FIRST',
    price: 'From €1,200',
    description: 'Drafting, red-line revision and negotiation support. The precise scope depends on the agreement and the role you want counsel to play in the negotiation.',
    subject: 'Contract Drafting & Negotiation'
  },
  'Salary / Termination Dispute': {
    type: 'FIXED FEE · €1,000',
    price: '€1,000',
    description: 'An initial legal matter package covering the contract, chronology, evidence and first legal response or negotiation position. Further proceedings are quoted separately where required.',
    subject: 'Salary / Termination Dispute'
  },
  'FIFA Football Tribunal Claim / Representation': {
    type: 'ASSESSMENT FIRST',
    price: 'From €2,500',
    description: 'Assessment and potential representation in a qualifying FIFA Football Tribunal matter. Jurisdiction, deadlines, evidence and conflicts are checked first.',
    subject: 'FIFA Football Tribunal Claim / Representation'
  },
  'CAS Arbitration': {
    type: 'ASSESSMENT FIRST',
    price: 'From €4,500',
    description: 'Specialist counsel for qualifying CAS matters. Procedural posture, jurisdiction, deadlines, evidence and conflicts are assessed before a mandate is accepted.',
    subject: 'CAS Arbitration'
  },
  'Football Agent & Agency Agreement Drafting': {
    type: 'FIXED FEE · €2,000',
    price: '€2,000',
    description: 'Drafting and refinement of football agent and agency representation agreements and related documentation, with attention to scope, fee, term, termination and dispute provisions.',
    subject: 'Football Agent & Agency Agreement Drafting'
  },
  'FFAR / Football Agent Regulatory Advice': {
    type: 'ASSESSMENT FIRST',
    price: 'Fee after assessment',
    description: 'Regulatory advice for football agents and agencies. The scope is defined after the agreement, process or issue is reviewed.',
    subject: 'FFAR / Football Agent Regulatory Advice'
  },
  '1-on-1 Legal Consultation': {
    type: 'FIXED FEE · €100',
    price: '€100',
    description: 'A focused 45-minute video or telephone consultation to discuss a contract, transfer, dispute, regulatory issue or next legal step.',
    subject: '1-on-1 Legal Consultation'
  }
};

const modal = document.getElementById('serviceModal');
const modalType = document.getElementById('modalType');
const modalPrice = document.getElementById('modalPrice');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const selectedService = document.getElementById('selectedService');
const serviceForm = document.getElementById('serviceForm');

function openModal(serviceName) {
  const detail = serviceDetails[serviceName];
  if (!detail) return;
  modalType.textContent = detail.type;
  modalPrice.textContent = detail.price;
  modalTitle.textContent = serviceName;
  modalDescription.textContent = detail.description;
  selectedService.value = serviceName;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => serviceForm.querySelector('input[name="name"]').focus(), 50);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.open));
});

document.querySelectorAll('[data-close]').forEach(element => {
  element.addEventListener('click', closeModal);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// Fixed-fee services use Stripe Payment Links. Until configured, the click gives a clear setup message.
document.querySelectorAll('[data-stripe]').forEach(element => {
  element.addEventListener('click', event => {
    const key = element.dataset.stripe;
    const link = STRIPE_LINKS[key];
    if (!link || link.startsWith('PASTE_')) {
      event.preventDefault();
      alert('Stripe Payment Link is not configured yet. Add the real Stripe Payment Link in legal-services.js for this service.');
      return;
    }
    element.href = link;
    element.target = '_blank';
    element.rel = 'noopener';
  });
});

const categories = document.querySelectorAll('.category');
const cards = document.querySelectorAll('.service-card');
categories.forEach(button => {
  button.addEventListener('click', () => {
    categories.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.category;
    cards.forEach(card => {
      const value = card.dataset.category || '';
      const show = category === 'all' || value.split(' ').includes(category);
      card.classList.toggle('is-hidden', !show);
    });
  });
});

const samples = {
  option: 'The Club shall have the sole and unilateral right to extend the Agreement for one additional season on the same terms.',
  termination: 'The Club may terminate this Agreement immediately at its sole discretion for any breach of club rules.',
  salary: 'The Player shall receive a monthly salary of 5,000 payable by the Club.',
  jurisdiction: 'All disputes shall be submitted exclusively to the local courts and no other forum shall have jurisdiction.'
};

document.querySelectorAll('[data-sample]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('clauseInput').value = samples[button.dataset.sample] || '';
    runPreliminaryCheck();
  });
});

document.getElementById('scanBtn').addEventListener('click', runPreliminaryCheck);
document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('clauseInput').value = '';
  document.getElementById('scanResult').innerHTML = '<div class="scan-empty">Your result will appear here.</div>';
});

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[character]));
}

function runPreliminaryCheck() {
  const text = document.getElementById('clauseInput').value.trim();
  const result = document.getElementById('scanResult');
  if (!text) {
    result.innerHTML = '<div class="scan-empty">Paste a short clause or choose a sample first.</div>';
    return;
  }

  const lower = text.toLowerCase();
  const findings = [];

  if (/unilateral|sole\s+discretion|extend|renew|option/.test(lower)) {
    findings.push({ title: 'Extension or one-sided discretion', body: 'This wording may deserve review for duration, balance between the parties, remuneration, timing and the legal effect of the option.' });
  }
  if (/salary|wage|payment|payable|defer|delay|overdue/.test(lower)) {
    findings.push({ title: 'Payment wording', body: 'Check the currency, payment date, gross or net basis, deductions, conditions and remedies for late payment.' });
  }
  if (/terminate|termination|immediately|breach/.test(lower)) {
    findings.push({ title: 'Termination wording', body: 'Check who may terminate, the grounds, notice or cure requirements, and the consequences for amounts still due.' });
  }
  if (/exclusive|jurisdiction|court|arbitration|forum|tribunal/.test(lower)) {
    findings.push({ title: 'Dispute-resolution wording', body: 'Check governing law, competent forum, arbitration provisions and any football-specific dispute mechanism elsewhere in the agreement.' });
  }

  if (!findings.length) {
    result.innerHTML = '<div class="scan-head"><strong>No obvious trigger detected</strong><span class="risk">SCREENING ONLY</span></div><p>The phrase-based screen did not identify one of its predefined triggers. That does not mean the clause is safe or effective.</p><p class="scan-disclaimer">A reliable legal conclusion requires review of the complete agreement and circumstances.</p>';
    return;
  }

  result.innerHTML = `<div class="scan-head"><strong>Potential issue${findings.length > 1 ? 's' : ''} to review</strong><span class="risk">ATTENTION</span></div>${findings.map(item => `<p><strong>${escapeHtml(item.title)}:</strong> ${escapeHtml(item.body)}</p>`).join('')}<p class="scan-disclaimer">This is a preliminary screening tool, not legal advice and not a legal conclusion.</p>`;
}

// Formspree handles submission for both contact and service forms.
if (document.getElementById('contactForm')) document.getElementById('contactForm').setAttribute('action', FORMSPREE_URL);
if (serviceForm) serviceForm.setAttribute('action', FORMSPREE_URL);
