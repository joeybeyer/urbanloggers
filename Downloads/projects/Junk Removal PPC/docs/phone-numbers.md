# SignalWire Numbers → Sites

Space: `seologicagency.signalwire.com` · Project: **junk removal** · Project ID `f510c85a-8dde-44e1-bdbd-5d478f336ff5`

The transcription script auto-pulls each number's **friendly_name** from SignalWire
(`IncomingPhoneNumbers`), so new sites self-label — just name the number after the site.

## Frank's own numbers (NOT billable — his marketing)
| Number | Label | Source tag |
|---|---|---|
| +1 630-652-5447 | Dumpster Rescue Landing page | `google-ads` (paid) |
| +1 630-604-6428 | (Medinah GBP) | `organic` |

## Joey's lead-gen city sites (BILLABLE to Frank @ $45)
| Number | Site / City |
|---|---|
| +1 630-780-5987 | Junk Removal Glen Ellyn IL |
| +1 630-780-5461 | Junk Removal Elmhurst IL |
| +1 630-780-4941 | Junk Removal Winfield IL |
| +1 630-780-4948 | Junk Removal Wayne IL |
| +1 630-780-4492 | Junk Removal St. Charles IL |
| +1 630-780-4508 | Junk Removal Bartlett IL |
| +1 630-604-7373 | Junk Removal Aurora IL |
| +1 630-593-3827 | Junk Removal Wheaton IL |

## Pending — domain owned, NO SignalWire number yet (can't bill until bought)
| Site / City | Domain | Action |
|---|---|---|
| Itasca | junkremovalitasca.com | Buy a 630 #, name it `Junk Removal Itasca IL`, point site at it |
| Warrenville | junkremovalwarrenville.com | Buy a 630 #, name it `Junk Removal Warrenville IL`, point site at it |

> Verified live against SignalWire `IncomingPhoneNumbers` on 2026-06-21. The 8 numbers above
> matched this doc exactly; the §C table in the rebuild spec did NOT (it was scrambled — now fixed).

> Classification logic lives in `transcribe_signalwire.py` (`FRANK_OWN` set + `classify()`).
> Any number NOT in Frank's-own = a lead-gen site = billable. Add a new site → buy a
> SignalWire number, name it `Junk Removal <City> IL`, point the site at it. No code change.
