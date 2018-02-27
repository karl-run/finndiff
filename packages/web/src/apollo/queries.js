import gql from 'graphql-tag';

export const versionQuery = gql`
  query Version {
    version
  }
`;

export const userQuery = gql`
  query User {
    user {
      loggedIn
      name
    }
  }
`;

export const watchedQuery = gql`
  query Watched {
    watched(orderBy: "lastChanged") {
      finnCode
      description
      lastChanged
      changes
    }
  }
`;

export const likedQuery = gql`
  query Liked {
    liked(orderBy: "lastChanged") {
      finnCode
      description
      lastChanged
      changes
    }
  }
`;

const sections = {
  generelleSeksjoner: [
    'innhold',
    'beliggenhet',
    'adkomst',
    'areal',
    'tomten',
    'veivannavloep',
    'borettslaget',
    'styregodkjennelse',
    'felleskostnader',
    'laanevilkaar',
    'utleie',
    'eiendommensbetegnelse',
    'kjoepekontrakt',
    'boligkjoeperforsikring',
    'solgtsomdener',
    'byggemaate',
    'oppvarming',
    'tinglysterettigheterogforpliktelser',
    'ligningsverdi',
    'beskrivelseavborettslaget',
    'fasteloependekostnader',
    'finansiering',
    'spesifikasjonavlaan',
    'adgangtilutleieboligformaal',
    'overtagelse',
    'forkjoepsrettformedlemmerstyregodkjennelse',
    'ansvarligmegler',
    'standard',
    'regulering',
    'sentralelover',
    'vedlikeholdtilstand',
    'parkering',
    'utstyr',
    'servitutterrettigheter',
    'ferdigattestellermidlbrukstillatelse',
    'reguleringsforhold',
    'budgiving',
    'kortomeiendommen',
  ],
  prisDetaljer: ['fellesgjeld', 'totalpris', 'formuesverdi', 'fellesformue', 'felleskost'],
  leilighetsDetaljer: [
    'primaerrom',
    'bruksareal',
    'soverom',
    'bruttoareal',
    'rom',
    'etasje',
    'boligtype',
    'eieform',
    'tomteareal',
    'byggeaar',
    'forkjoepsrett',
    'eierskifteforsikring',
    'festeavgift',
    'energimerking',
  ],
};

export const getSpecificAdQuery = gql`
  query getSpecificAd($finnCode: String!) {
    adHistory(id: $finnCode) {
      pulled
      tittel
      solgt
      adresse
      pris
      omkostninger
      matrikkelinformasjon
      prisDetaljer {
        ${sections.prisDetaljer.map(
          section => `${section} {
          beskrivelse
          verdi
        }`,
        )}
      }
      leilighetsDetaljer {
        ${sections.leilighetsDetaljer.map(
          section => `${section} {
          beskrivelse
          verdi
        }`,
        )}
      }
      generelleSeksjoner {
        ${sections.generelleSeksjoner.map(
          section => `${section} {
          beskrivelse
          verdi
        }`,
        )}
      }
    }
  }
`;
