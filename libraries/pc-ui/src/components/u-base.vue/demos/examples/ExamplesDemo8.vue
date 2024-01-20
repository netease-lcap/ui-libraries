<!-- 代码块 -->

<template>
  <div><pre>
factorial = (num) -&gt;
    if not /^\d+$/.test(num)
        throw 'Error: Not an integer!'

    _factorial = (num) -&gt;
        return (if num &lt;= 1 then 1 else num * _factorial(num - 1))

    return _factorial(num)
</pre></div>
</template>