' run_hidden.vbs — runs the passed command line with NO visible window (intWindowStyle 0).
' Used by the Dumpster scheduled tasks so the cmd/python console never pops up.
' Re-quotes any argument that contains a space so paths survive intact.
Dim sh, cmd, i, a
Set sh = CreateObject("WScript.Shell")
cmd = ""
For i = 0 To WScript.Arguments.Count - 1
  a = WScript.Arguments(i)
  If InStr(a, " ") > 0 Then a = """" & a & """"
  cmd = cmd & a & " "
Next
WScript.Quit sh.Run(cmd, 0, True)   ' hidden window (0) + WAIT for the job so the task result = the job's real exit code
