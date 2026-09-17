export interface CoreValue {
  title: string
  points: [string, string, string]
}

// Wortgetreu aus dem Kunden-Feedback-PDF übernommen.
export const coreValues: CoreValue[] = [
  {
    title: 'Verbindlich',
    points: [
      'Anvertraute Geschichten als heiligen Boden bewahren.',
      'Scham, Angst und Unsicherheit entgegentreten.',
      'Verletzlichkeit erlauben und Verbindlichkeit fördern.',
    ],
  },
  {
    title: 'Gegenwart',
    points: [
      'Sensibel sein für Gottes Stimme.',
      'Bewusst Zeit für Gebet nehmen und über die Schrift meditieren.',
      'Gegenwart Gottes in herausfordernden Zeiten wahrnehmen und darin wandeln.',
    ],
  },
  {
    title: 'Ehre',
    points: [
      'Empfangen durch Wertschätzen und Ehren von Menschen und Situationen.',
      'Die Haltung der Ehre während Konfrontation und Meinungsverschiedenheit bewahren.',
      'Kultur der Ehre während der Abwesenheit von Personen ausleben.',
    ],
  },
  {
    title: 'Grosszügigkeit',
    points: [
      'Grosszügigkeit im Denken und in der Interpretation der Absichten anderer zeigen.',
      'Finanziell grosszügig sein im Hinblick auf die Vision vom Königreich Gottes.',
      'Gegenüber den Bedürfnissen anderer grosszügig sein.',
    ],
  },
  {
    title: 'Übernatürliches',
    points: [
      'Bewusst leben und stets eine übernatürliche Lösung erwarten.',
      'Authentisch sein in den Geschichten, die wir erzählen.',
      'Mit Weisheit und Kraft voranschreiten.',
    ],
  },
  {
    title: 'Freiheit',
    points: [
      'Frei «Ja» oder «Nein» sagen — und dazu stehen.',
      'Frei, um die Liebe zueinander aufrechtzuerhalten in allen Situationen.',
      'Frei, Neues erkunden, Risiken eingehen, Konsequenzen annehmen und korrigieren.',
    ],
  },
  {
    title: 'Vermächtnis',
    points: [
      'Entscheidungen treffen, welche die kommenden Generationen mit Segen beeinflussen.',
      'Täglich das volle Potenzial ausschöpfen und nach Exzellenz streben.',
      'Persönliche Erfolge in gesellschaftliche Durchbrüche verwandeln.',
    ],
  },
]

export const faithStatement = {
  title: 'Bekenntnis von Nicäa',
  paragraphs: [
    'Wir glauben an den einen Gott, den Vater, den Allmächtigen, der alles geschaffen hat, Himmel und Erde, die sichtbare und die unsichtbare Welt. Und an den einen Herrn Jesus Christus, Gottes eingeborenen Sohn, aus dem Vater geboren vor aller Zeit: Gott von Gott, Licht vom Licht, wahrer Gott vom wahren Gott, gezeugt, nicht geschaffen, eines Wesens mit dem Vater; durch ihn ist alles geschaffen. Für uns Menschen und zu unserem Heil ist er vom Himmel gekommen, hat Fleisch angenommen durch den Heiligen Geist von der Jungfrau Maria und ist Mensch geworden.',
    'Er wurde für uns gekreuzigt unter Pontius Pilatus, hat gelitten und ist begraben worden, ist am dritten Tage auferstanden nach der Schrift und aufgefahren in den Himmel. Er sitzt zur Rechten des Vaters und wird wiederkommen in Herrlichkeit, zu richten die Lebenden und die Toten; seiner Herrschaft wird kein Ende sein. Wir glauben an den Heiligen Geist, der Herr ist und lebendig macht, der aus dem Vater und dem Sohn hervorgeht, der mit dem Vater und dem Sohn angebetet und verherrlicht wird, der gesprochen hat durch die Propheten, und die eine, heilige, allgemeine und apostolische Kirche.',
    'Wir bekennen die eine Taufe zur Vergebung der Sünden. Wir erwarten die Auferstehung der Toten und das Leben der kommenden Welt.',
  ],
  amen: 'Amen.',
}
