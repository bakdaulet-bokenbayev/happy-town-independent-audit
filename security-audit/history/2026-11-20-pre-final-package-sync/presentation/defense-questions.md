# Happy Town audit defense questions

## A. IT audit fundamentals

### 1. What is an IT Security Audit?

An IT security audit evaluates security controls against defined criteria. It uses evidence to explain which controls work in the audited scope, which have deficiencies and where more evidence is needed. We used selected ASVS requirements as our criteria.

**По-русски.** Аудит ИТ-безопасности проверяет меры защиты по заданным критериям. По собранным доказательствам аудитор определяет, какие меры работают в пределах проверки, где есть недостатки и где данных пока недостаточно.

### 2. What is the difference between an audit and penetration testing?

An audit can inspect documentation, source code and behavior, then report conclusions against agreed criteria. A penetration test focuses on demonstrating what an attacker could achieve under agreed conditions. In Happy Town, controlled tests were one source of audit evidence.

**По-русски.** Аудит оценивает документы, код и поведение системы по согласованным критериям. Тестирование на проникновение изучает, чего может добиться атакующий в разрешённых условиях. В проекте контролируемые проверки были частью аудита.

### 3. What is an Audit Scope?

The scope defines what the audit covers and where its conclusions apply. Our scope included one local Happy Town build, synthetic records and selected sign-in, session, role and data workflows. It excluded production, real school data and third-party infrastructure.

**По-русски.** Область аудита определяет, что проверяется и где применимы выводы. Мы проверяли одну локальную сборку, синтетические записи и выбранные сценарии. Рабочая среда, реальные данные и сторонняя инфраструктура были исключены.

### 4. What is an Audit Plan?

An audit plan records the objective, criteria, scope, participants, authorization, methods, schedule and expected outputs. Our plan documents the owner’s written authorization and the self-review limitation.

**По-русски.** План аудита фиксирует цель, критерии, границы, участников, разрешение на проверки, методы, сроки и результаты работы. В нашем плане также отражены разрешение владельца и ограничение независимости.

### 5. What is Evidence Collection?

Evidence collection means obtaining and recording information that can support a conclusion. We kept versioned source references, sanitized observations and a browser screenshot. Each working paper links the case, expected behavior and outcome to the retained evidence.

**По-русски.** Сбор доказательств помогает обосновать выводы. Мы сохранили ссылки на код проверенной версии, обезличенные наблюдения и снимок формы входа. Рабочие документы связывают требования, ожидания и результаты с доказательствами.

### 6. What is the purpose of an Audit Report?

It explains what was assessed, what the evidence supports and which limitations apply. It records confirmed deficiencies, their risks and recommended actions so the owner can prioritize improvements and plan a retest.

**По-русски.** Отчёт объясняет, что проверили, какие выводы подтверждены и какие ограничения действуют. Он фиксирует недостатки, уровень риска и рекомендации для исправления и повторной проверки.

## B. OWASP ASVS

### 7. What is OWASP ASVS?

The OWASP Application Security Verification Standard describes requirements for verifying the security of web applications. It gives developers and auditors a common reference for controls such as sign-in, sessions, authorization and data protection.

**По-русски.** OWASP ASVS — стандарт проверки безопасности веб-приложений. Он задаёт требования к защите входа, сессий, прав доступа и данных.

### 8. Why did you choose ASVS 5.0.0?

We selected the official 5.0.0 release as a fixed assessment baseline. Our matrix uses versioned requirement IDs, so a reviewer can find the same text and level in the official release. [OWASP ASVS 5.0.0](https://github.com/OWASP/ASVS/tree/v5.0.0)

**По-русски.** Мы зафиксировали официальную версию 5.0.0. Идентификаторы с номером версии позволяют проверяющему найти те же формулировки и уровни в стандарте.

### 9. What is the difference between ASVS Level 1 and Level 2?

Level 1 is the starting point and covers foundational requirements. Level 2 includes applicable Level 1 requirements and adds deeper checks. The Happy Town audit used a selection from Level 1 only.

**По-русски.** Уровень 1 содержит базовые требования. Уровень 2 включает применимые требования уровня 1 и добавляет более глубокие проверки. Мы выбрали часть требований первого уровня.

### 10. Why did you select only 17 requirements?

The selection focused on relevant controls we could examine in a university project using a local lab. Accounts, sessions and access to student records were priorities. Each of the 17 selected requirements had a defined case and evidence expectations.

**По-русски.** Мы ограничили объём проверками, которые важны для Happy Town и выполнимы в учебном проекте. В приоритете были учётные записи, сессии и доступ к данным учащихся. Для каждого критерия определили проверку и ожидаемые доказательства.

### 11. Can you claim full ASVS compliance?

No. We report case-level conclusions for 17 selected Level 1 requirements on the assessed local revision. Full Level 1 conformance and official certification are outside the assessment.

**По-русски.** Нет. Выводы относятся к 17 выбранным требованиям и проверенной локальной версии. Полное соответствие уровню 1 и официальную сертификацию не оценивали.

## C. Application security

### 12. What is the difference between Authentication and Authorization?

Authentication verifies the identity of a user. Authorization decides what that user may do. In Happy Town, sign-in identifies a parent, and server-side authorization checks whether that parent is linked to the requested student.

**По-русски.** Аутентификация подтверждает личность пользователя. Авторизация определяет его права. После входа родителя сервер отдельно проверяет его связь с запрошенной записью учащегося.

### 13. What is JWT?

JWT means JSON Web Token. It is a compact format for carrying claims, such as a user identity or an expiry time. Happy Town uses Auth.js to issue and verify JWT sessions. A valid token still needs to be evaluated against the application’s access rules.

**По-русски.** JWT — компактный формат для передачи сведений, например идентификатора пользователя или срока действия. Happy Town использует Auth.js для выпуска и проверки JWT. Права доступа приложение проверяет отдельно.

### 14. How does session management work?

After successful credential verification, the server issues a session token in a cookie. On protected requests it verifies the token and checks that the account is active. Ordinary logout removes the browser cookie. HT-12 found that this logout path records no server-side revocation for the session.

**По-русски.** После успешного входа сервер выдаёт токен сессии в cookie. При защищённом запросе сервер проверяет токен и активность учётной записи. Выход удаляет cookie в браузере, но проверенная реализация не отзывает сессию на сервере.

### 15. What is IDOR?

Insecure Direct Object Reference is a type of access control issue. A person can access a record through its identifier when the server fails to check permission for that record. Happy Town rejected both sampled cross-parent reads with 404 and returned no student data.

**По-русски.** IDOR возникает, когда сервер позволяет получить чужую запись по её идентификатору без проверки права доступа. Оба запроса к чужим записям в нашей выборке получили 404, и данные учащихся не вернулись.

### 16. Why is server-side authorization important?

The server must check permissions even when a request reaches it outside the normal interface. Hiding a menu or button cannot enforce access. The sampled Happy Town API denied the teacher access to the admin listing, while the administrator was allowed.

**По-русски.** Сервер должен проверять права независимо от того, как пришёл запрос. Скрытая кнопка сама по себе не защищает API. В проверке сервер разрешил действие администратору и отказал учителю.

### 17. What is input validation?

Input validation checks whether supplied data meets the rules before the application uses it. The Happy Town checks examined selected server-side rules. Sampled invalid sign-in or admin inputs were rejected without creating a valid session or the invalid record.

**По-русски.** Валидация проверяет входные данные до обработки. В проверенных серверных сценариях ошибочные данные не привели к созданию сессии или некорректной записи.

### 18. Why is sensitive information in URLs dangerous?

Request URLs may be copied into access logs, browser diagnostics or monitoring systems, where other people may see them. HT-17 confirmed that a synthetic teacher email was placed in a URL. Actual retention or disclosure was unverified.

**По-русски.** URL может попасть в журналы доступа, инструменты браузера или систему мониторинга. В HT-17 подтвердили передачу синтетического адреса в URL. Сохранение адреса в других системах и его раскрытие не подтверждены.

## D. Audit results

### 19. Why did HT-12 receive Medium risk?

In the local lab, likelihood was Low because continued access would require an existing valid session and access to the app. Impact was High because a privileged session could still allow management actions. The risk matrix combines these as Medium. The source review established the revocation gap. Fieldwork observed ordinary sign-out. Reuse of a prior token was outside the runtime observation.

**По-русски.** Для возможного злоупотребления нужны действующая сессия и доступ к локальному приложению, поэтому вероятность низкая. Последствия для привилегированной сессии могут быть высокими. По матрице это средний риск. Анализ кода подтвердил отсутствие серверного отзыва сессии. Повторное использование токена во время проверки не наблюдалось.

### 20. Why did HT-17 receive Low risk?

Normal admin search can put a contact term in a URL, giving Medium likelihood in the lab. Impact was Low for the sampled contact field. The isolated Playwright run observed the exact synthetic email in the GET query. HTTP 200 returned one matching teacher. Secondary retention and disclosure were unverified.

**По-русски.** Адрес попадает в URL в штатном сценарии, поэтому вероятность оценена как средняя. Для проверенного контактного поля воздействие низкое. Такая комбинация даёт низкий риск. Дальнейшее сохранение или раскрытие адреса не подтверждены.

### 21. What does Inconclusive mean?

An Inconclusive case produced evidence, but the evidence could not support a Pass or Fail. HT-07 still lacks a complete baseline for comparing the credential-abuse implementation. HT-11 showed fresh session issuance without establishing invalidation during replacement. The separate documentation reassessment confirmed HT-05 and HT-13 as Fail.

**По-русски.** Доказательств не хватило для окончательной оценки. В HT-07 нет полной спецификации для сравнения с реализацией. В HT-11 выпуск нового токена подтверждён, а отзыв заменённой сессии — нет. Повторная оценка документации подтвердила два отдельных несоответствия: HT-05 и HT-13.

### 22. How did you collect Evidence?

The fieldwork combined source review, controlled local HTTP observations, a browser check and isolated tests. The working papers retained identifiers, expectations, redacted results and references. Passwords, session values and real school records were excluded from the evidence.

**По-русски.** Использовали анализ кода, контролируемые локальные HTTP-наблюдения, проверку в браузере и изолированные тесты. Сохранили обезличенные результаты и ссылки. Пароли, значения сессий и реальные записи учащихся не включали.

### 23. How did you determine risk ratings?

We assessed likelihood and impact separately. Likelihood depends on how easily the issue can occur in the audited lab. Impact describes the possible consequences for the affected data or permissions. The risk matrix combines the two values into a priority.

**По-русски.** Вероятность и воздействие оценивали по отдельности. Учитывали условия локальной среды и возможные последствия для данных и прав. Матрица объединяет две оценки и задаёт приоритет.

### 24. What would happen if an unauthorized parent accessed another student's data?

That would breach confidentiality and could expose private educational information. The exact impact would depend on what data became visible. In our tests, both cross-parent requests were denied and returned no student data.

**По-русски.** Такой доступ нарушил бы конфиденциальность и мог раскрыть учебные данные. Последствия зависели бы от состава полученных сведений. В наших проверках оба запроса были отклонены без выдачи данных.

## E. Audit limitations

### 25. What are the limitations of your audit?

The audit covered one local revision, synthetic data, selected workflows and 17 Level 1 criteria. Local HTTP limits transport-security conclusions. HT-07 and HT-11 remain inconclusive. Old-token acceptance after logout was not tested. The student auditors co-developed the application, which limits independence.

**По-русски.** Проверялась одна локальная версия, использовались синтетические данные и выбранные сценарии. Локальный HTTP ограничивает выводы о защите передачи данных. HT-07 и HT-11 остаются неопределёнными. Принятие старого токена после выхода не проверялось. Оба аудитора участвовали в разработке, что ограничивает независимость.

### 26. Why is auditor independence limited?

Both Student Auditors, Bakdaulet Bokenbayev and Assel Karzhau, co-developed Happy Town. Bakdaulet is the Lead Auditor and Project Owner. The professor accepted the arrangement for the academic assignment. Reviewing work we helped develop creates a self-review threat, so the report discloses limited independence.

**По-русски.** Бакдаулет Бокенбаев и Асель Каржау совместно разработали Happy Town. Бакдаулет — ведущий аудитор и владелец проекта. Преподаватель разрешил такой формат учебного аудита. Проверка собственной работы ограничивает независимость, и это прямо указано в отчёте.

### 27. What would you do differently if you repeated the audit?

We would confirm the authoritative access policy and credential-abuse specification before fieldwork. We would also define session lifecycle cases in advance and arrange an independent evidence review if available.

**По-русски.** До начала повторного аудита мы бы уточнили, какие документы задают правила доступа и защиты от злоупотреблений при входе. Также заранее описали бы сценарии жизненного цикла сессий и по возможности организовали независимую проверку доказательств.

### 28. What should be improved first?

Server-side session invalidation comes first because HT-F01 has the highest risk rating. Then address the contact search URL, document credential-abuse protection and formalize the authorization rules. Verify corrective actions and collect the missing evidence for HT-07 and HT-11.

**По-русски.** Приоритет — серверный отзыв сессии, поскольку риск HT-F01 выше. Далее следует убрать контактные данные из URL и оформить документацию по защите входа и правилам доступа. После изменений нужно проверить исправления и собрать недостающие доказательства по HT-07 и HT-11.

### 29. Why did you use a self-hosted application?

The local deployment gave the owner control of the environment, code and synthetic fixtures. That made the scope reproducible and allowed examination of both source and observed behavior. The findings apply to that setup.

**По-русски.** Самостоятельное локальное развёртывание позволило владельцу контролировать среду, код и тестовые данные. Поэтому проверку можно воспроизвести и сопоставить код с поведением системы. Выводы относятся к этой конфигурации.

### 30. What would be the next stage of the security assessment?

The owner can respond to the findings, set target dates and implement agreed changes. A focused retest would verify the changes in an authorized local lab. Further evidence would then allow a new decision on each inconclusive case.

**По-русски.** Владелец может официально ответить на замечания, назначить сроки и внести согласованные изменения. Затем нужна повторная проверка в разрешённой локальной среде. Дополнительные доказательства помогут уточнить выводы по неопределённым случаям.

## F. Documentation reassessment

### 31. Why did HT-05 and HT-13 move from Inconclusive to Fail?

The audit reassessed the documentation at the same revision after fieldwork. For HT-05, the README names a limiter but omits its configuration and protection against malicious lockout. For HT-13, it summarizes access checks but leaves specific function permissions and resource rules incomplete. The revised matrix links these results to the dated reassessment.

**По-русски.** После основных проверок повторно изучили документацию той же версии. В HT-05 не были описаны настройки ограничителя и защита от злоумышленной блокировки. В HT-13 не хватало конкретных прав на функции и правил доступа к записям. Основания зафиксированы в отдельном документе.

### 32. Why did authorization tests pass when the authorization policy failed?

HT-13 checks documented access rules. HT-14, HT-15 and HT-16 check the sampled implementation. The server denied the sampled unauthorized requests, while the application documentation left some of the underlying rules unspecified. Both conclusions are supported by their own evidence.

**По-русски.** HT-13 оценивает документацию, а HT-14, HT-15 и HT-16 — реализацию. Сервер отклонил проверенные запросы без прав доступа, при этом часть правил осталась неописанной.

### 33. How do the original and final totals reconcile?

The original execution record shows 11 Pass, 2 Fail and 4 Inconclusive. A later documentation review changed HT-05 and HT-13 to Fail. The final totals are 11 Pass, 4 Fail and 2 Inconclusive. The original record is preserved.

**По-русски.** Первоначально было 11 Pass, 2 Fail и 4 Inconclusive. После проверки документации HT-05 и HT-13 получили Fail. Итог: 11 Pass, 4 Fail и 2 Inconclusive. Исходные результаты сохранены.
