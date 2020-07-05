interface AbstractFactory {
    createProductA() : AbstractProductA;
    
    createProductB() : AbstractProductB; 
}

// ConcreteFactory гарантира че продуктите, които ще създаде, са съвместими един с друг
class ConcreteFactory1 implements AbstractFactory {
    public createProductA() : AbstractProductA {
        return new ConcreteProductA1();
    }

    public createProductB() : AbstractProductB {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 implements AbstractFactory {
    public createProductA() : AbstractProductA {
        return new ConcreteProductA2();
    }

    public createProductB() : AbstractProductB {
        return new ConcreteProductB2();
    }
}

// ПРОДУКТ А
interface AbstractProductA {
    usefulFunctionA() : string;
}

class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA() : string {
        return 'Резултатът от продукта А1!';
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA() : string {
        return 'Резултатът от продукта А2!';
    }
}

// ПРОДУКТ Б - абстрактния продукт В ще е съпоставим с А
interface AbstractProductB {
    usefulFunctionB() : string;

    // съпоставима е с продукта А
    anotherUsefulFunctionB(collaborator: AbstractProductA) : string;
}

class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB() : string {
        return 'Резултатът от продукта B1!';
    }

    public anotherUsefulFunctionB(collaborator: AbstractProductA) : string {
        const result = collaborator.usefulFunctionA();
        return `Резултатът от колаборацията на В1 с (${result})!`;
    }
}

class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB() : string {
        return 'Резултатът от продукта B2!';
    }

    public anotherUsefulFunctionB(collaborator: AbstractProductA) : string {
        const result = collaborator.usefulFunctionA();
        return `Резултатът от колаборацията на В2 с (${result})!`;
    }
}

// Използвайки абстрактната фабрика, clientCode ни дава възможност да създаваме продукти от различни фабрики, абстрахирайки
// се от конкретната им реализация на създаване на продукти
function clientCode (factory : AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productA.usefulFunctionA());
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

// Извикваме clientCode с различни фабрики
console.log('Testing client code with 1st factory type...');
clientCode(new ConcreteFactory1());

console.log('Testing client code with 2nd factory type...');
clientCode(new ConcreteFactory2());