# TDD Documentation

# Installation

A la racine du projet vue :

- `vue add unit-jest`

Un dossier tests est créé, nous placerons nos tests unitaires dans le sous dossier unit.

Pour lancer les tests, il suffit de lancer :

- `yarn test:unit`

# Pourquoi la méthodologie TDD ?

- TDD : test driven development. Comme son nom l'indique au lieu de développer une fonctionnalité pour la tester par la suite, nous allons réflechir en amont comment pourrions nous tester une fonctionnalité avant de la développer. Il faut imaginer qu'est ce qui pourrait engendrer un bug et identifier les points nécessaires au bon fonctionnement de celle-ci. Il est donc important d'avoir une idée claire de ce que l'on veut développer avant de commencer à coder. Cette méthodologie va nous forcer à nous poser des questions notamment dans la gestion des erreurs et des exceptions, ce qui est très souvent la soure des bugs.

- Imaginons que nous voulions creer un composant prenant en props un message et qui se charger simplement d'afficher ce message dans un titre. Nous devons tout d'abord nous assurer que le composant soit bien monté, qu'il contient bien une props de type String, vérifier sa valeur par défaut, vérifier qu'il y ai bien un titre dans le template de la page etc.
- Toutes ces conditions sont nécessaires au bon fonctionnement du composant et doivent être testées et ce pour plusieurs raisons :

  1.  Si nous avons pensé à effectuer tous les tests nécessaires et que lorque nous testons le composant, tous ces tests sont bons alors notre composant ne contient pas de bugs ou de régessions. S'il ne fonctionne pas correctement, ce n'est pas un problème interne au composant. Si cette situation se produit, on peut donc chercher un bug provenant de l'environnement dans lequel le composant vis. Il n'est pas forcément nécessaire de remettre en cause le fonctionnement du composant dans un premier temps, ce qui nous permet de gagner du temps.

  2.  Si nous voulons ajouter une fonctionnalité, nous devons toujours garder les tests précédents bons. Ceci nous garantie que le fonctionnement du composant n'est pas perturbé par l'ajout de nouvelles fonctions ou données. En effet si les tests passent tous, le fonctionnement qui était garanti par le volet de test précédent l'est toujours. Ce qui évite de nombreuses régressions qui sont chronophages.

  3.  Si ce composant est utilisé par une autre personne voire réutilisé plus tard, les tests permettent de s'assurer que le composant est toujours fonctionnel et permettent aisément de détecter les erreurs lors du debuggage. Cela permet de gagner en maintenabilité et de réutiliser des composants de manière fluide et rapide.

# Methodologie

- Nous commençons tout d'abord par écrire le test afin de coder la fonctionnalité. Il faut d'abord faire échouer le test avant de le résoudre de la manière la plus simple possible. Une fois le test bon, on passe à un autre test qui va aussi échouer puis nous résolvons ce test et ainsi de site. Cette méthode permet d'avancer de brique en brique tout en s'assurant que ce qu'on a fait précédemment est toujours valide. Par exemple si vous savons que nous allons avoir besoin d'une prop pour un composant nous devons d'abord creer un test qui va vérifier que cette prop existe, puis lancer le test qui va echouer car nous ne l'avons pas encore créée. Ensuite nous passerons au test de vérification du type de la prop, de la valeur par défaut etc. Ainsi, nous avons un composant qui se complexifie mais qui n'a pas de régressions au fur et à mesure du développement des nouvelles fonctionnalités.

- Cette méthode paraît assez laborieuse et semble nous faire perdre un temps conséquent pour vérifier des choses assez simples et basiques mais permet un gain de temps énorme lors de la réutilisation et ajout de fonctionnalités. Cela rend aussi le debug beaucoup plus simple et plus rapide.

# Tester un composant

- Creer un fichier dans le dossier tests/unit : **nomDuComposantATester.spec.js**

- Nous allons d'abord importer shallowMount de '@vue/test-utils' qui permettra de mounter le composant à tester : **import { shallowMount } from '@vue/test-utils'**

- Puis importer le composant à tester

- Création d'une factory permettant de faciliter le montage du composant :

```
import { shallowMount } from  '@vue/test-utils'
import  HelloWorld  from  '@/components/HelloWorld.vue'

const  factory = (values = {}) => {
	return  shallowMount(HelloWorld, {
		data() {
			return {
				...values,
			};
		},
	});
};
```

- Création d'une batterie de test :

```
describe("HelloWorld.vue", () => {

});
```

- Dans ce volet de test, nous pouvons ajouter différents tests que notre composant devra passer pour son bon fonctionnement. Par exemple, nous allons tester que le composant s'est monté correctement :

```
describe("HelloWorld.vue", () => {
	it("must exists", () => {
		const  wrapper = factory();
		expect(wrapper.exists()).toBe(true);
		});
	});
});
```

En premier paramètre de la fonction it, nous mettons le nom du test qui sera plus tard affiché dans la console lorsque nous lancerons yarn test:unit et qui permettra de savoir facilement à quoi est du le bug. Ce nom doit être explicite, nous devons pouvoir comprendre le test sans avoir besoin de retourner dans le code pour vérifié ce que l'on a testé.
En deuxième paramètre, nous mettons une fonction qui permettra de définir si le test est bon ou non.

Le wrapper représente notre composant monté en utilisant la factory expliquée précédemment. Il existe de nombreuses méthodes permettant d'accéder aux données de notre composant en utilisant la variable wrapper :
**https://vue-test-utils.vuejs.org/api/wrappe**

expect, comme son nom l'indique décrit ce que le test doit vérifier. De même, il existe plusieurs méthodes permettant de tester :
**https://jestjs.io/docs/en/expect**

- Si maintenant nous voulons lancer notre premier test, nous pouvons lancer **yarn test:unit**. Les tests se lancent et normelement tous doivent être valides.

# Couverture de code

Une fois nos tests réalisés, il faut se demandé si tout notre code à été balayé par les tests. Pour cela, il existe une fonctionnalité qui permet de verifier que nos tests sont à priori complets.
Il suffit de rajouter le flag --coverage à la commande yarn test:unit.
Cela va afficher un tableau récapitulatif de la couverture de code. Nous pouvons voir si tout le code est couvert et si ce n'est pas le cas, les lignes qui ne sont pas couvertes sont indiquées. Il est important de tester l'intégralité du code.

# Exemple d'utilisation

Dans cet exemple, nous allons tester un composant qui va prendre se charger d'additionner deux nombres et d'afficher le résultat de manière dynamique.

Règles :

- Si un champ n'est pas rempli sa valeur sera considérée comme égale à 0
- Le calcul se fera en temps réel
