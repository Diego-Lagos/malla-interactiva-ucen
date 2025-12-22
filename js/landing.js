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
    const match = clean.match(/^(.*)\s+\[(.+)\]$/);
    return {
      baseName: match ? match[1].trim() : clean,
      code: match ? match[2].trim() : ''
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
        const yearMatch = link.match(/_(\d{4})$/);
        const year = yearMatch ? yearMatch[1] : '';

        if (!groups.has(info.baseName)) {
          groups.set(info.baseName, []);
        }

        groups.get(info.baseName).push({
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
        plans.sort((a, b) => {
          const yearCompare = (a.year || '').localeCompare(b.year || '');
          if (yearCompare !== 0) {
            return yearCompare;
          }
          return (a.code || '').localeCompare(b.code || '');
        });

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

          const codeLabel = plan.code || 'Plan';
          const yearLabel = plan.year ? `Plan ${plan.year}` : 'Plan vigente';

          button.href = `?m=${encodeURIComponent(plan.link)}`;
          button.setAttribute('aria-label', `Abrir ${careerName} ${codeLabel}`);

          const codeSpan = document.createElement('span');
          codeSpan.className = 'plan-code';
          codeSpan.textContent = codeLabel;

          const yearSpan = document.createElement('span');
          yearSpan.className = 'plan-year';
          yearSpan.textContent = yearLabel;

          button.appendChild(codeSpan);
          button.appendChild(yearSpan);
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
