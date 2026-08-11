/**
 * Corps de l'article « Meilleur hébergeur cloud français 2026 ».
 * Généré par scripts/build-article.mjs depuis scripts/raw/meilleur-hebergeur-cloud-france.html —
 * modifier la source ou la config, puis relancer le script.
 */

export const html = `<aside class="tldr"><p class="tldr-label">L’essentiel</p><p><strong>L'essentiel.</strong> <strong>OVHcloud</strong> reste la référence pour qui veut de l'infrastructure française à bas coût, à condition d'accepter un support par tickets. <strong>Scaleway</strong> offre l'approche la plus moderne pour des développeurs. <strong>o2switch</strong> et <strong>Infomaniak</strong> dominent sur le support et la simplicité. Un point de méthode d'emblée, parce qu'il fausse presque tous les comparatifs du marché : la <strong>latence réseau</strong> vers un serveur français est de l'ordre de 15 à 30 ms, mais le <strong>temps de réponse réel</strong> d'une page servie est de 143 à 312 ms selon l'hébergeur. Ce sont deux mesures différentes, et seule la seconde décrit ce que vit votre visiteur.</p></aside>
<p>La question de l'hébergement souverain a cessé d'être théorique. Entre la juridiction applicable aux données, la latence réelle et la disponibilité d'un support en français, le choix d'un hébergeur français se décide sur des critères mesurables — à condition de mesurer la bonne chose.</p>

<h2 id="latence-reseau-et-temps-de-reponse-la-confusion-a-lever">Latence réseau et temps de réponse : la confusion à lever</h2>
<p>C'est l'erreur la plus répandue dans les comparatifs d'hébergement, et elle conduit à des décisions fausses.</p>
<p>La <strong>latence réseau</strong> — ce que mesure un <em>ping</em> — est le temps qu'un paquet met à faire l'aller-retour jusqu'au serveur. Depuis Paris vers un centre de données français, elle tourne autour de 15 à 30 millisecondes. C'est un plancher physique, imposé par la distance et le réseau.</p>
<p>Le <strong>temps de réponse</strong>, ou <em>time to first byte</em>, est le délai avant que le premier octet de la page arrive. Il inclut la latence réseau, mais aussi le temps que le serveur met à exécuter votre application, interroger la base de données et composer la réponse. C'est ce que mesure Google, et c'est ce que perçoit votre visiteur.</p>
<p>L'écart entre les deux est considérable : nos relevés donnent 143 ms pour OVHcloud servant une page WordPress standard, quand la latence réseau vers Roubaix se compte en dizaines de millisecondes. Un comparatif qui annonce « 18 ms de TTFB » mesure un ping et l'appelle autrement.</p>
<p>Les chiffres de ce comparatif sont ceux de notre relevé continu de quatre-vingt-dix jours, publié dans notre <a href="/hebergement-web/meilleur-vps-2026">comparatif VPS</a> : dix mesures par jour depuis Paris, sur une instance d'entrée de gamme servant la même page chez chaque hébergeur.</p>

<h2 id="pourquoi-heberger-en-france">Pourquoi héberger en France</h2>
<p>Trois arguments tiennent, et un quatrième circule à tort.</p>
<p><strong>La juridiction.</strong> Un hébergeur français place vos données sous droit européen, hors de portée directe du <em>Cloud Act</em> américain qui permet aux autorités des États-Unis d'accéder aux données détenues par des sociétés américaines, où qu'elles soient stockées. C'est l'argument le plus solide, et le seul qui soit d'ordre juridique plutôt que technique.</p>
<p><strong>La latence.</strong> Un serveur en France économise 100 à 200 millisecondes de latence réseau par rapport à un centre de données nord-américain. Sur une page qui enchaîne plusieurs requêtes, l'écart se cumule.</p>
<p><strong>Le support.</strong> Un interlocuteur dans votre fuseau, en français, qui connaît la TVA, les noms de domaine en .fr et les contraintes du secteur médical. Ce n'est pas un détail au moment d'une panne.</p>
<p><strong>Ce qui ne tient pas :</strong> l'idée qu'un hébergement français améliorerait mécaniquement le référencement. Google ne classe pas selon la nationalité de l'hébergeur. Il tient compte du temps de réponse, qui dépend de la proximité — c'est un effet indirect, pas un bonus de souveraineté.</p>

<h2 id="notre-methode">Notre méthode</h2>
<p>Ce classement applique le <a href="/protocole-jdlt">Protocole JDLT</a> à un périmètre précis : les offres d'hébergement destinées à une audience française, sous juridiction européenne. Six critères pondérés.</p>
<div class="table-wrap"><div class="table-wrap"><table><tbody>
<tr><th><p>Critère</p></th><th><p>Poids</p></th><th><p>Ce qu'il mesure</p></th></tr>
<tr><td><p><strong>Disponibilité</strong></p></td><td><p>25 %</p></td><td><p>Relevé continu sur quatre-vingt-dix jours</p></td></tr>
<tr><td><p><strong>Temps de réponse depuis Paris</strong></p></td><td><p>25 %</p></td><td><p>Dix mesures par jour, page identique chez chaque hébergeur</p></td></tr>
<tr><td><p><strong>Support en français</strong></p></td><td><p>20 %</p></td><td><p>Canaux disponibles, plages horaires, délai de réponse</p></td></tr>
<tr><td><p><strong>Juridiction et conformité</strong></p></td><td><p>15 %</p></td><td><p>Localisation, contrat de sous-traitance, certifications</p></td></tr>
<tr><td><p><strong>Évolutivité</strong></p></td><td><p>10 %</p></td><td><p>Souplesse des ressources, interface de programmation</p></td></tr>
<tr><td><p><strong>Rapport prix-performance</strong></p></td><td><p>5 %</p></td><td><p>Coût réel au renouvellement rapporté aux ressources</p></td></tr>
</tbody></table></div></div>
<p><strong>Pourquoi ces notes diffèrent de notre comparatif VPS.</strong> Sept de ces huit hébergeurs y figurent déjà, avec d'autres résultats — Infomaniak y est premier, OVHcloud deuxième, Scaleway septième. L'exercice n'est pas le même : le comparatif VPS évalue des machines virtuelles louées à un profil technique, celui-ci évalue des offres d'hébergement pour une audience française, où le support, la simplicité et la juridiction pèsent 35 % de la note contre une part bien plus faible ailleurs. Les mesures de disponibilité et de temps de réponse, elles, sont rigoureusement les mêmes : ce sont les mêmes relevés.</p>

<h2 id="le-classement">Le classement</h2>
<p>Disponibilité et temps de réponse issus du relevé de quatre-vingt-dix jours clos le 21 juillet 2026. Tarifs d'entrée relevés en août 2026, hors promotion de première année.</p>
<div class="table-wrap"><div class="table-wrap"><table><tbody>
<tr><th><p>Hébergeur</p></th><th><p>Note</p></th><th><p>Disponibilité</p></th><th><p>Temps de réponse</p></th><th><p>Localisation</p></th><th><p>À partir de</p></th></tr>
<tr><td><p><strong>OVHcloud</strong></p></td><td><p><strong>9,2</strong></p></td><td><p>99,97 %</p></td><td><p>143 ms</p></td><td><p>Roubaix, Gravelines, Strasbourg</p></td><td><p>4,99 €</p></td></tr>
<tr><td><p><strong>Scaleway</strong></p></td><td><p><strong>8,8</strong></p></td><td><p>99,93 %</p></td><td><p>156 ms</p></td><td><p>Paris</p></td><td><p>4,99 €</p></td></tr>
<tr><td><p><strong>Infomaniak</strong></p></td><td><p><strong>8,5</strong></p></td><td><p>99,98 %</p></td><td><p>187 ms</p></td><td><p>Suisse</p></td><td><p>6,42 €</p></td></tr>
<tr><td><p><strong>o2switch</strong></p></td><td><p><strong>8,3</strong></p></td><td><p>Non mesurée</p></td><td><p>Non mesuré</p></td><td><p>Clermont-Ferrand</p></td><td><p>7,99 €</p></td></tr>
<tr><td><p><strong>PlanetHoster</strong></p></td><td><p><strong>8,1</strong></p></td><td><p>99,88 %</p></td><td><p>221 ms</p></td><td><p>France et Canada</p></td><td><p>3,99 €</p></td></tr>
<tr><td><p><strong>Hostinger</strong></p></td><td><p><strong>7,9</strong></p></td><td><p>99,94 %</p></td><td><p>312 ms</p></td><td><p>Europe, dont la France</p></td><td><p>2,49 €</p></td></tr>
<tr><td><p><strong>LWS</strong></p></td><td><p><strong>7,6</strong></p></td><td><p>99,91 %</p></td><td><p>198 ms</p></td><td><p>France</p></td><td><p>2,99 €</p></td></tr>
<tr><td><p><strong>IONOS</strong></p></td><td><p><strong>7,4</strong></p></td><td><p>99,89 %</p></td><td><p>267 ms</p></td><td><p>Europe</p></td><td><p>1 € la première année</p></td></tr>
</tbody></table></div></div>
<p>o2switch n'a pas été inclus dans le relevé de quatre-vingt-dix jours : son offre n'est pas une instance comparable aux autres. Sa note repose sur les cinq autres critères, et nous le signalons plutôt que de lui attribuer des chiffres que nous n'avons pas mesurés.</p>

<h2 id="les-huit-hebergeurs-en-detail">Les huit hébergeurs en détail</h2>

<h3 id="1-ovhcloud-9-2">1. OVHcloud — 9,2</h3>
<p>Le premier hébergeur européen, avec une infrastructure entièrement française et des certifications qui couvrent les secteurs régulés, dont l'hébergement de données de santé. Disponibilité mesurée à 99,97 %, soit 2 h 11 d'interruption cumulée sur trois mois, et le meilleur temps de réponse du relevé.</p>
<p><strong>Sa limite :</strong> le support, principalement par tickets et forum. Une panne un vendredi soir se gère seul.</p>
<p><strong>Notre verdict :</strong> le meilleur choix pour qui a les compétences techniques et veut de l'infrastructure française à coût maîtrisé.</p>

<h3 id="2-scaleway-8-8">2. Scaleway — 8,8</h3>
<p>Filiale française du groupe Iliad, construite autour d'une approche moderne : instances, stockage objet, orchestration de conteneurs, interface de programmation soignée, facturation à l'usage. Deuxième temps de réponse du relevé, centres de données à Paris.</p>
<p><strong>Sa limite :</strong> moins de services clés en main qu'OVHcloud, et une maîtrise technique nécessaire pour contenir la facture à l'usage.</p>
<p><strong>Notre verdict :</strong> le choix rationnel pour une équipe de développement française, et l'alternative sérieuse aux fournisseurs américains sur ce créneau.</p>

<h3 id="3-infomaniak-8-5">3. Infomaniak — 8,5</h3>
<p>Société suisse indépendante, la meilleure disponibilité du relevé : 99,98 %, soit 1 h 44 d'interruption sur trois mois. Support en français par téléphone et messagerie, bilan carbone publié, écosystème complet du courriel au stockage.</p>
<p><strong>Sa limite :</strong> les serveurs sont en Suisse. Le pays bénéficie d'une décision d'adéquation de la Commission européenne, ce qui règle la question du transfert de données — mais pas celle des secteurs qui imposent une localisation strictement française, comme l'hébergement de données de santé certifié.</p>
<p><strong>Notre verdict :</strong> le meilleur choix quand l'interruption coûte plus cher que l'abonnement, et quand la contrainte de localisation s'arrête à l'Europe.</p>

<h3 id="4-o2switch-8-3">4. o2switch — 8,3</h3>
<p>Une offre unique à 7,99 € par mois, sans grille ni palier : domaines et bases illimités, stockage NVMe, certificat inclus. Serveurs à Clermont-Ferrand, support français par messagerie instantanée et téléphone, réputé pour répondre en minutes.</p>
<p><strong>Sa limite :</strong> ni machine virtuelle ni serveur dédié. Un site à fort trafic ou une application qui demande des ressources garanties devra partir ailleurs. C'est aussi la raison pour laquelle il n'entre pas dans notre relevé comparatif.</p>
<p><strong>Notre verdict :</strong> le meilleur rapport simplicité-fiabilité pour un indépendant ou une PME qui ne veut pas administrer d'infrastructure.</p>

<h3 id="5-planethoster-8-1">5. PlanetHoster — 8,1</h3>
<p>Structure franco-canadienne, avec un engagement de réponse du support en moins d'un quart d'heure et une pile technique optimisée pour WordPress. Disponibilité mesurée à 99,88 %, la plus faible du relevé, et temps de réponse à 221 ms.</p>
<p><strong>Sa limite :</strong> des centres de données en France et au Canada. Vérifiez lequel vous est attribué avant la mise en production, faute de quoi la question du transfert hors Union européenne se pose.</p>
<p><strong>Notre verdict :</strong> pertinent pour une agence qui gère plusieurs sites clients et facture la réactivité du support.</p>

<h3 id="6-hostinger-7-9">6. Hostinger — 7,9</h3>
<p>Les tarifs les plus bas du panel et une prise en main soignée, avec une disponibilité mesurée élevée à 99,94 %.</p>
<p><strong>Sa limite :</strong> le temps de réponse le plus élevé du relevé, 312 ms à ± 71, avec une part significative de l'infrastructure hors de France. Le siège est en Lituanie, ce qui reste dans l'Union européenne, mais la localisation effective de votre instance se vérifie à la commande.</p>
<p><strong>Notre verdict :</strong> imbattable sur le prix d'entrée. Le temps de réponse se rattrape en partie avec un cache et un réseau de diffusion.</p>

<h3 id="7-lws-7-6">7. LWS — 7,6</h3>
<p>Hébergeur français à tarifs bas, centres de données en France, engagement affiché sur la consommation énergétique, et la particularité d'inclure l'infogérance sans supplément sur ses offres de machines virtuelles.</p>
<p><strong>Sa limite :</strong> un support principalement par tickets, moins réactif que celui d'o2switch ou d'Infomaniak.</p>
<p><strong>Notre verdict :</strong> le bon compromis quand le budget prime et que la localisation française est une exigence.</p>

<h3 id="8-ionos-7-4">8. IONOS — 7,4</h3>
<p>Acteur historique européen, support téléphonique en français disponible en continu, interface simplifiée et offres groupées avec nom de domaine et adresses de courriel.</p>
<p><strong>Sa limite :</strong> le tarif d'appel à 1 € la première année masque un renouvellement plusieurs fois supérieur. C'est le point à vérifier avant de signer, et il vaut pour toutes les offres promotionnelles du marché.</p>
<p><strong>Notre verdict :</strong> rassurant pour un débutant qui veut un interlocuteur au téléphone. Calculez le coût sur trois ans avant de vous engager.</p>

<h2 id="cinq-points-a-verifier-avant-de-souscrire">Cinq points à vérifier avant de souscrire</h2>
<ul>
<li><p><strong>Le tarif de renouvellement, pas le prix d'appel.</strong> Trois offres de ce panel affichent une promotion de première année. Multipliez le tarif plein par trente-six avant de comparer.</p></li>
<li><p><strong>La localisation effective de votre instance</strong>, et non le siège social de l'hébergeur. Plusieurs opérateurs européens répartissent leurs machines sur plusieurs pays : le choix se fait à la commande.</p></li>
<li><p><strong>Le contrat de sous-traitance.</strong> Demandez-le avant de signer, pas après. Il précise les transferts éventuels et les sous-traitants ultérieurs.</p></li>
<li><p><strong>Le temps de réponse réel, pas le ping.</strong> Mesurez-le sur votre application, pas sur une page vide. C'est la seule mesure qui décrit ce que vit votre visiteur.</p></li>
<li><p><strong>Les conditions de sortie.</strong> Export des données, format, délai, coût. Un hébergeur dont la migration se paie cher est un hébergeur qu'on ne quitte pas.</p></li>
</ul>

<h2 id="cloud-mutualise-machine-virtuelle-lequel">Cloud, mutualisé, machine virtuelle : lequel</h2>
<p>Les trois mots recouvrent des réalités différentes, et le vocabulaire commercial les mélange volontiers.</p>
<p>L'<strong>hébergement mutualisé</strong> partage les ressources d'un serveur entre de nombreux clients. C'est le moins cher, le plus simple, et le plus exposé aux voisins bruyants. Il convient à un site vitrine.</p>
<p>La <strong>machine virtuelle</strong> vous réserve des ressources garanties sur un serveur partagé, avec un accès administrateur. C'est le palier qui suit, traité dans notre <a href="/hebergement-web/meilleur-vps-2026">comparatif VPS</a>.</p>
<p>Le <strong>cloud</strong>, au sens strict, répartit les ressources sur une infrastructure élastique facturée à l'usage, avec une interface de programmation pour les piloter. Il se justifie quand la charge varie fortement, pas quand elle est stable — auquel cas une machine virtuelle coûte moins cher pour le même service.</p>
<p>Notre <a href="/hebergement-web/meilleur-hebergeur-web-2026">comparatif des hébergeurs web</a> couvre le premier cas, et notre <a href="/hebergement-web/meilleur-hebergeur-wordpress">guide des hébergeurs WordPress</a> le cas particulier de ce logiciel.</p>

<h2 id="faq-hebergement-cloud-francais">FAQ — hébergement cloud français</h2>
<p><strong>Quel est le meilleur hébergeur cloud français en 2026 ?</strong> OVHcloud pour l'infrastructure française à coût maîtrisé, si vous avez les compétences techniques. Scaleway pour une équipe de développement. o2switch pour la simplicité et le support. Infomaniak si la disponibilité prime — c'est la meilleure du relevé, 99,98 %, mais les serveurs sont en Suisse.</p>
<p><strong>Pourquoi héberger en France plutôt qu'aux États-Unis ?</strong> Pour la juridiction d'abord : un hébergeur français place vos données hors de portée directe du Cloud Act américain. Pour la latence ensuite, de l'ordre de 100 à 200 millisecondes économisées sur chaque requête. Pour le support enfin. En revanche, l'hébergement français n'améliore pas mécaniquement le référencement : Google tient compte du temps de réponse, pas de la nationalité de l'hébergeur.</p>
<p><strong>Infomaniak est-il conforme au RGPD avec des serveurs en Suisse ?</strong> Oui. La Suisse bénéficie d'une décision d'adéquation de la Commission européenne, qui autorise le transfert de données sans garantie supplémentaire. La réserve porte ailleurs : certains secteurs imposent une localisation strictement française, notamment l'hébergement de données de santé certifié. Dans ce cas, il faut un hébergeur avec centres de données en France.</p>
<p><strong>Quelle différence entre mutualisé et cloud ?</strong> Le mutualisé partage les ressources d'un serveur entre plusieurs clients, sans garantie. Le cloud répartit les ressources sur une infrastructure élastique, facturée à l'usage, pilotable par interface de programmation. Le cloud coûte plus cher et ne se justifie que si votre charge varie : à charge stable, une machine virtuelle offre le même service pour moins cher.</p>
<p><strong>Un serveur français répond-il vraiment en 20 millisecondes ?</strong> Non, et c'est la confusion la plus fréquente. Vingt millisecondes, c'est la latence réseau, ce que mesure un ping. Le temps de réponse réel d'une page servie inclut aussi l'exécution de votre application : nos relevés donnent de 143 à 312 millisecondes selon l'hébergeur, sur une page WordPress standard. Méfiez-vous des comparatifs qui annoncent des TTFB à deux chiffres.</p>
<p><strong>Combien coûte un hébergement professionnel en France ?</strong> De 2,49 € à 8 € par mois pour les offres d'entrée de ce panel. Pour une infrastructure de production avec redondance, comptez plutôt 50 à 200 € mensuels. Le facteur décisif n'est pas le tarif d'appel mais le prix au renouvellement, qui double parfois.</p>

<h2 id="comment-lire-ce-classement">Comment lire ce classement</h2>
<p>Les mesures de disponibilité et de temps de réponse proviennent de notre relevé continu de quatre-vingt-dix jours, clos le 21 juillet 2026, sur une instance d'entrée de gamme servant la même page chez chaque hébergeur. Elles décrivent ce périmètre et pas un autre : votre application, votre configuration et votre trafic donneront d'autres chiffres.</p>
<p>Les notes, elles, sont une appréciation éditoriale qui pondère ces mesures avec le support, la juridiction et le rapport prix-performance. Elles diffèrent volontairement de celles de notre <a href="/hebergement-web/meilleur-vps-2026">comparatif VPS</a>, qui évalue les mêmes hébergeurs sur un autre usage.</p>

<h2 id="transparence">Transparence</h2>
<p>Les tarifs sont relevés en août 2026 sur les grilles publiques des hébergeurs et évoluent plusieurs fois par an. Nos critères et notre protocole de mesure sont publics : voir le <a href="/protocole-jdlt">Protocole JDLT</a>.</p>
<p>Le Journal de la Tech est édité par <a href="https://www.triaina.fr" rel="nofollow sponsored">Triaina</a>, agence de référencement naturel. Elle n'exploite aucune infrastructure d'hébergement et n'a de lien avec aucun des hébergeurs comparés ici ; le lien ci-dessus est commercial.</p>`;

/** Sommaire dérivé des titres de niveau 2. */
export const toc: { id: string; text: string }[] = [
  {
    "id": "latence-reseau-et-temps-de-reponse-la-confusion-a-lever",
    "text": "Latence réseau et temps de réponse : la confusion à lever"
  },
  {
    "id": "pourquoi-heberger-en-france",
    "text": "Pourquoi héberger en France"
  },
  {
    "id": "notre-methode",
    "text": "Notre méthode"
  },
  {
    "id": "le-classement",
    "text": "Le classement"
  },
  {
    "id": "les-huit-hebergeurs-en-detail",
    "text": "Les huit hébergeurs en détail"
  },
  {
    "id": "cinq-points-a-verifier-avant-de-souscrire",
    "text": "Cinq points à vérifier avant de souscrire"
  },
  {
    "id": "cloud-mutualise-machine-virtuelle-lequel",
    "text": "Cloud, mutualisé, machine virtuelle : lequel"
  },
  {
    "id": "faq-hebergement-cloud-francais",
    "text": "FAQ — hébergement cloud français"
  },
  {
    "id": "comment-lire-ce-classement",
    "text": "Comment lire ce classement"
  },
  {
    "id": "transparence",
    "text": "Transparence"
  }
];

/** Questions/réponses de la FAQ, balisées en FAQPage. */
export const faq: { question: string; answer: string }[] = [
  {
    "question": "Quel est le meilleur hébergeur cloud français en 2026 ?",
    "answer": "OVHcloud pour l'infrastructure française à coût maîtrisé, si vous avez les compétences techniques. Scaleway pour une équipe de développement. o2switch pour la simplicité et le support. Infomaniak si la disponibilité prime — c'est la meilleure du relevé, 99,98 %, mais les serveurs sont en Suisse."
  },
  {
    "question": "Pourquoi héberger en France plutôt qu'aux États-Unis ?",
    "answer": "Pour la juridiction d'abord : un hébergeur français place vos données hors de portée directe du Cloud Act américain. Pour la latence ensuite, de l'ordre de 100 à 200 millisecondes économisées sur chaque requête. Pour le support enfin. En revanche, l'hébergement français n'améliore pas mécaniquement le référencement : Google tient compte du temps de réponse, pas de la nationalité de l'hébergeur."
  },
  {
    "question": "Infomaniak est-il conforme au RGPD avec des serveurs en Suisse ?",
    "answer": "Oui. La Suisse bénéficie d'une décision d'adéquation de la Commission européenne, qui autorise le transfert de données sans garantie supplémentaire. La réserve porte ailleurs : certains secteurs imposent une localisation strictement française, notamment l'hébergement de données de santé certifié. Dans ce cas, il faut un hébergeur avec centres de données en France."
  },
  {
    "question": "Quelle différence entre mutualisé et cloud ?",
    "answer": "Le mutualisé partage les ressources d'un serveur entre plusieurs clients, sans garantie. Le cloud répartit les ressources sur une infrastructure élastique, facturée à l'usage, pilotable par interface de programmation. Le cloud coûte plus cher et ne se justifie que si votre charge varie : à charge stable, une machine virtuelle offre le même service pour moins cher."
  },
  {
    "question": "Un serveur français répond-il vraiment en 20 millisecondes ?",
    "answer": "Non, et c'est la confusion la plus fréquente. Vingt millisecondes, c'est la latence réseau, ce que mesure un ping. Le temps de réponse réel d'une page servie inclut aussi l'exécution de votre application : nos relevés donnent de 143 à 312 millisecondes selon l'hébergeur, sur une page WordPress standard. Méfiez-vous des comparatifs qui annoncent des TTFB à deux chiffres."
  },
  {
    "question": "Combien coûte un hébergement professionnel en France ?",
    "answer": "De 2,49 € à 8 € par mois pour les offres d'entrée de ce panel. Pour une infrastructure de production avec redondance, comptez plutôt 50 à 200 € mensuels. Le facteur décisif n'est pas le tarif d'appel mais le prix au renouvellement, qui double parfois."
  }
];

/** Sources citées, reprises en fin d'article et dans le balisage. */
export const sources: { url: string; label: string }[] = [];
