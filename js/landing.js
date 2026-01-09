(() => {
  const landingRoot = document.getElementById('landing');
  if (!landingRoot) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const mallaParam = params.get('m');
  if (mallaParam) {
    return;
  }

  const list = landingRoot.querySelector('[data-career-list]');
  const status = landingRoot.querySelector('[data-landing-status]');

  if (!list) {
    return;
  }

  const splitCareer = (rawName) => {
    const clean = String(rawName || '').trim();
    const parts = clean.split(' - ');

    if (parts.length >= 3) {
      return {
        baseName: parts.slice(0, -2).join(' - ').trim(),
        planName: parts[parts.length - 2].trim(),
        code: `Plan ${parts[parts.length - 1].trim()}` // Formato: Plan XX00
      };
    }

    return {
      baseName: clean,
      planName: 'Plan Único',
      code: ''
    };
  };

  fetch('./data/carreras.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load carreras.json');
      }
      return response.json();
    })
    .then((careers) => {
      const groups = new Map();

      careers.forEach((career) => {
        const info = splitCareer(career.Nombre);
        const link = String(career.Link || '');
        const yearMatch = link.match(/_([a-zA-Z]{2}\d{2})$/);
        const year = yearMatch ? yearMatch[1] : '';

        if (!groups.has(info.baseName)) {
          groups.set(info.baseName, []);
        }

        groups.get(info.baseName).push({
          planName: info.planName,
          code: info.code,
          year,
          link,
          fullName: String(career.Nombre || '').trim()
        });
      });

      const sorted = Array.from(groups.entries()).sort((a, b) =>
        a[0].localeCompare(b[0], 'es', { sensitivity: 'base' })
      );

      list.innerHTML = '';

      sorted.forEach(([careerName, plans], index) => {
        plans.sort((a, b) => (a.code || '').localeCompare(b.code || ''));

        const card = document.createElement('article');
        card.className = 'landing-card';
        card.style.setProperty('--stagger', `${index * 0.06}s`);

        const header = document.createElement('header');
        header.className = 'landing-card-header';

        const title = document.createElement('h3');
        title.textContent = careerName;

        const meta = document.createElement('p');
        meta.className = 'landing-meta';
        meta.textContent = plans.length === 1 ? 'Plan disponible' : `${plans.length} planes disponibles`;

        header.appendChild(title);
        header.appendChild(meta);

        const planWrap = document.createElement('div');
        planWrap.className = 'landing-plans';

        plans.forEach((plan, planIndex) => {
          const button = document.createElement('a');
          button.className = 'plan-button';
          if (planIndex % 2 === 1) {
            button.classList.add('plan-button-secondary');
          }

          button.href = `?m=${encodeURIComponent(plan.link)}`;
          button.setAttribute('aria-label', `Abrir ${careerName} ${plan.planName} ${plan.code}`);

          const planSpan = document.createElement('span');
          planSpan.className = 'plan-code';
          planSpan.textContent = plan.planName;

          const codeSpan = document.createElement('span');
          codeSpan.className = 'plan-year';
          codeSpan.textContent = plan.code;

          button.appendChild(planSpan);
          button.appendChild(codeSpan);
          planWrap.appendChild(button);
        });

        card.appendChild(header);
        card.appendChild(planWrap);
        list.appendChild(card);
      });

      if (status) {
        status.style.display = 'none';
      }
    })
    .catch((error) => {
      if (status) {
        status.textContent = 'No se pudo cargar la lista de carreras.';
      }
      console.error(error);
    });
})();